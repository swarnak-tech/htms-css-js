const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

const app = express();
app.use(cors());

const server = http.createServer(app);

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

let users = [];

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  users.push(socket.id);
  io.emit("usersList", users);

  // Send existing tasks
  const tasks = await Task.find();
  socket.emit("initialTasks", tasks);

  // Add Task
  socket.on("addTask", async (taskData) => {
    const newTask = new Task(taskData);
    await newTask.save();

    const updatedTasks = await Task.find();
    io.emit("updateTasks", updatedTasks);
  });

  // Delete Task
  socket.on("deleteTask", async (id) => {
    await Task.findByIdAndDelete(id);

    const updatedTasks = await Task.find();
    io.emit("updateTasks", updatedTasks);
  });

  // Edit Task
  socket.on("updateTask", async (updatedTask) => {
    await Task.findByIdAndUpdate(updatedTask._id, updatedTask);

    const updatedTasks = await Task.find();
    io.emit("updateTasks", updatedTasks);
  });

  socket.on("disconnect", () => {
    users = users.filter(id => id !== socket.id);
    io.emit("usersList", users);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
