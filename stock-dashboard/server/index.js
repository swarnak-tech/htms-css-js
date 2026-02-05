const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  setInterval(() => {
    const randomPrice = (Math.random() * 1000).toFixed(2);
    socket.emit("stockUpdate", randomPrice);
  }, 2000);
});

server.listen(5000, () => {
  console.log("Backend running on port 5000");
});
