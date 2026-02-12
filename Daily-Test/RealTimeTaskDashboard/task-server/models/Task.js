//IMPORTING MONGOOSE
const mongoose = require("mongoose");

//CREATING A SCHEMA FOR TASKS COLLECTION
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: String,
  assignedTo: String,
});

//EXPORTING THE TASK MODEL
module.exports = mongoose.model("Task", taskSchema);
