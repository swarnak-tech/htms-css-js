const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: String,
  assignedTo: String,
});

module.exports = mongoose.model("Task", taskSchema);
