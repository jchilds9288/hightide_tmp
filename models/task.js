const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    title: {type: String, required: true},
    points: {type: Number, required: true},
    taskAccomplished: {type: Boolean, default: false}
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

