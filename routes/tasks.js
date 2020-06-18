const express = require("express");
const router = express.Router();
const task = require("../models/task");

//get all tasks
router.get("/", (req, res) => {
  task
    .find()
    .then((tasks) => res.status(200).json({ results: tasks }))
    .catch((error) => res.status(400).json(error));
});
// get tasks of a subcategory
router.get("/sc/:id", (req, res) => {
  const { id } = req.params;
  task
    .find({ subCategoryId: id })
    .then((tasks) => res.status(200).json({ results: tasks }))
    .catch((error) => res.status(400).json(error));
});
// get tasks by user
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  task
    .find({ userId: id })
    .then((tasks) => res.status(200).json({ results: tasks }))
    .catch((error) => res.status(400).json(error));
});
// get tasks by project
router.get("/project/:id", (req, res) => {
  const { id } = req.params;
  task
    .find({ projectId: id })
    .then((tasks) => res.status(200).json({ results: tasks }))
    .catch((error) => res.status(400).json(error));
});
// get task with id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  task
    .findOne({ _id: id })
    .then((task) => res.status(200).json({ success: true, results: task }))
    .catch((error) => res.status(400).json({ error: error.message }));
});

// insert task
router.post("/", (req, res) => {
  const { body } = req;
  const emp = new task(body);
  emp
    .save()
    .then((doc) => res.status(201).json({ success: true, results: doc }))
    .catch((error) => res.status(400).json(error));
});
// update task
router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  task
    .findOneAndUpdate({ _id: id }, { ...body, _id: id })
    .then((doc) => res.status(200).json({ success: true, results: doc }))
    .catch((error) => res.status(400).json(error));
});

// delete task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
      task
    .findOneAndDelete({ _id: id })
    .then((doc) => res.status(200).json({ success: true }))
    .catch((error) => res.status(400).json(error));
});
module.exports = router;
