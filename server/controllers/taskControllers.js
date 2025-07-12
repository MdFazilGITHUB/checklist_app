const taskModel = require("../models/taskModel");

const getTask = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    console.log(tasks)
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json("Error in fetching data");
  }
};

const addTask = async (req, res) => {
  const { name, unit, weight, subActivity } = req.body;
  try {
    const task = await taskModel.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json("Error in creating data");
  }
};

const updateTask = async (req, res) => {
  const { name, unit, weight, subActivity } = req.body;
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json("Error in updating data");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    res.status(204).json("Deleted Task");
  } catch (error) {
    res.status(500).json("Error in deleting data");
  }
};

module.exports = { getTask, addTask, updateTask, deleteTask };
