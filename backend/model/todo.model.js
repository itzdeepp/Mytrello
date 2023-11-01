const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task: { type: String, required: true },
    status: { type: Boolean, required: true },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;