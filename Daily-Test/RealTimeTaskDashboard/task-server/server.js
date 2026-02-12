//IMPORTING REQUIRED MODULES

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

//CREATING AN EXPRESS APP AND HTTP SERVER

const app = express();
app.use(cors());// Enable CORS for FRONTEND CONNECTIONS

const server = http.createServer(app);

//CREATING A SOCKET.IO SERVER

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  //ARRAYTO STORE ACTIVE USERS(SOCKET IDS)
let users = [];

//WHEN A NEW CLIENT CONNECTS TO THE SERVER

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  //ADD USER TO THE ACTIVE USERS ARRAY  
  users.push(socket.id);
  io.emit("usersList", users);

  // Send existing tasks from the database to the newly connected client
  const tasks = await Task.find();
  socket.emit("initialTasks", tasks);

  // Add Task event
  socket.on("addTask", async (taskData) => {
    const newTask = new Task(taskData);
    await newTask.save();

    const updatedTasks = await Task.find();
    io.emit("updateTasks", updatedTasks);
  });

  // Delete Task event
  socket.on("deleteTask", async (id) => {
    await Task.findByIdAndDelete(id);

    const updatedTasks = await Task.find();
    io.emit("updateTasks", updatedTasks);
  });

  // Update Task event(Edit)
  socket.on("updateTask", async (updatedTask) => {
    await Task.findByIdAndUpdate(updatedTask._id, updatedTask);

    const updatedTasks = await Task.find();
    io.emit("updateTasks", updatedTasks);
  });

  //When a user dicconects
  socket.on("disconnect", () => {
    users = users.filter(id => id !== socket.id);
    io.emit("usersList", users);
  });
});

//starting the server on port 5000
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
