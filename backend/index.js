const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
const userRoutes = require("./reuters/user.router");
const todoRoutes = require("./reuters/todo.router");

dotenv.config();
connectionDB();
const app = express();
app.use(cors());
app.use(express.json());

// index route
app.get("/", (req, res) => {
    res.json({message:"welcome to TODO"})
})

// authentication routers
app.use('/user' , userRoutes);

// todo routers
app.use('/todo' , todoRoutes);


const port = process.env.PORT || 9001
app.listen(port, console.log("server is running at post = ", port));