const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide title"],
    },
    body: {
        type: String,
        required: [true, "please provide body"]
    },
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })


const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;