const mongoose = require("mongoose");

const subTask = new mongoose.Schema({
    sName:String,
    sUnit:String,
    sWeight:Number
})

const task = new mongoose.Schema({
    name:String,
    unit:String,
    weight:Number,
    subActivity:[subTask]
})


const taskModel = mongoose.model('Task',task)

module.exports = taskModel

