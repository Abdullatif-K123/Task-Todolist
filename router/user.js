const router = require("express").Router();
const { deleteOne } = require("../models/TodoTask");
//Models
const TodoTask = require("../models/TodoTask");

//post method!!!
router
  .post("/api/:id", async (req, res) => {
    const id = req.params.id;
    const todoTask = new TodoTask({ userId: id, content: req.body.content });
      try {
        await todoTask.save();
        res.status(200).json("storring is done..");
      } catch (err) {
        res.status(500).json("some thing wrong with db");
      }

   
  })
  //Get Method for all todo specific user!!!
  .get("/api/:id", (req, res) => {
    const id = req.params.id;
    TodoTask.find({ userId: id }, (err, tasks) => {
      if (!err) res.status(200).json(tasks);
      else res.status(500).json(err);
    });
  })
  //Get Method information todo
  .get("/api/:id/:todoId", (req, res) => {
    const id = req.params.id;
    const todoId = req.params.todoId;
    TodoTask.findOne({ _id: todoId, userId: id }, (err, task) => {
      if (!err) res.status(200).json(task);
      else res.status(500).json(err);
    });
  })
  .delete("/api/:id/:todoId", (req, res) => {
    const id = req.params.todoId;
    TodoTask.findByIdAndRemove({_id: id }, (err) => {
      if (err) return res.json(500, err);
      res.status(200).json("removing task is done ");
    });
  })
  .put("/api/:id/:todoId", (req, res) => {
    const id = req.params.id;
    const takskId = req.params.todoId;
    TodoTask.findByIdAndUpdate(
      { _id: takskId, userId: id },
      { content: req.body.content },
      (err) => {
        if (err) return res.json(500, err);
        res.status(200).json("editing is done perfectly ");
      }
    );
  });
  module.exports = router;
