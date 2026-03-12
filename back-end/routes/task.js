const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const { userId, title, description, date, completed } = req.body;

    const newTask = await Task.create({
      userId,
      title,
      description,
      date,
      completed,
    });
   
    res.json({
      message: "Task created",
      task: newTask,
    });
  

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/tasks", async (req, res) => {
  try {

    const { userId } = req.query;

    const tasks = await Task.find({ userId }).sort({ date: -1 });

    res.json({ tasks });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.patch("/tasks/:id", async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;

    await task.save();

    res.json({
      message: "Task updated",
      task
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;