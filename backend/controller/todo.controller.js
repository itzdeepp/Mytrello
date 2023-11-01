const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Todo = require("../model/todo.model");
const validator = require("validator");


// create Task
const createTask = async (req, res) => {
    try {
        let { task, status } = req.body;

        // Sanitize and validate task input
        task = validator.trim(validator.unescape(task));
        if (!task) {
            return res.status(422).json({ error: "Please fill the title." });
        }

        // Validate and sanitize status input
        if (typeof status !== "boolean") {
            return res.status(422).json({ error: "Invalid status value." });
        }

        // Create a new todo object
        const newTodo = new Todo({
            task: task,
            status: status,
            userID: req.user._id
        });

        // Save the new todo to the database
        await newTodo.save();

        // Respond with success message
        return res.status(201).json({ message: "Task created.", data: newTodo });

    } catch (error) {

        // Log the error and send an error response
        console.error("Error creating task:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};


// update Task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        // Validate taskId
        if (!taskId) {
            return res.status(400).json({ error: "Task ID is missing." });
        }

        // Find the task by ID and user, and then update status
        const task = await Todo.findOneAndUpdate(
            { _id: taskId, userID: req.user._id },
            { $set: { status: status } },
            { new: true } // Return the updated document
        );

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Respond with the updated task
        res.status(200).json({ message: "Task updated.", data: task });

    } catch (error) {

        // Log the error and send an error response
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};


// get Task
const getAllTasks = async (req, res) => {
    try {
        // Find all todos for the user
        const todos = await Todo.find({ userID: req.user._id });

        // Respond with the list of todos
        res.status(200).json({ data: todos, message: "List of all todos." });

    } catch (error) {

        // Log the error and send an error response
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};


// get Task
const getSingleTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Validate taskId
        if (!taskId) {
            return res.status(400).json({ error: "Task ID is missing." });
        }

        // Find the task by ID and user
        const task = await Todo.findOne({ _id: taskId, userID: req.user._id });

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Respond with the task details
        res.status(200).json({ data: task, message: "Task found." });

    } catch (error) {

        // Log the error and send an error response
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};


// delete Task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Validate taskId
        if (!taskId) {
            return res.status(400).json({ error: "Task ID is missing." });
        }

        // Find the task by ID and user
        const deletedTask = await Todo.findOneAndDelete({
            _id: taskId,
            userID: req.user._id
        });

        // Check if the task exists
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found." });
        }

        // Respond with the deleted task
        res.status(200).json({ message: "Task deleted.", data: deletedTask });

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { createTask, updateTask, getAllTasks, deleteTask, getSingleTask };