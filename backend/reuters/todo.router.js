const express = require("express");
const { createTask, getAllTasks, deleteTask, updateTask, getSingleTask } = require("../controller/todo.controller");
const { authUserMiddleware } = require("../middeware/auth.middleware");
const router = express.Router();

// create a task end point
router.route("/create").post(authUserMiddleware,createTask);

// get all tasks end point
router.route("/get/all").get(authUserMiddleware, getAllTasks);

//  gwet a specific task end point
router.route("/get/:id").get(authUserMiddleware, getSingleTask);

// delet a task end point
router.route("/delete/:id").delete(authUserMiddleware, deleteTask);

// update a task end point
router.route("/update/:id").put(authUserMiddleware, updateTask);


// export router
module.exports= router
