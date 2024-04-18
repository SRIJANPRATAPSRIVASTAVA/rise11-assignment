const User = require("../model/user.model");
const Todo = require("../model/todo.model");

exports.addTodo = async function (req, res) {
    const { body, title } = req.body;

    if (!body || !title) {
        return res.status(400).json({ msg: "body and title is missing !!" });
    }

    try {
        let todo = await Todo.create({
            owner: req.user._id,
            title,
            body
        });

        req.user.todos.push(todo._id);
        await req.user.save();

        /*
        const myuser = await User.findById(req.user._id).populate('todos');
        const myuser = await todo.populate('owner', "-password");
        console.log("myuser", myuser);
        */

        res.status(200).json({ todo });
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.deleteTodo = async function (req, res) {
    const { todoId } = req.params;

    if (!todoId) {
        return res.status(400).json({ msg: "id is missing !!" });
    }

    try {
        await Todo.findByIdAndDelete(todoId);

        req.user.todos = req.user.todos.filter(id => id.toString() !== todoId);

        await req.user.save();

        res.status(200).json({ msg: "Todo deleted successfully." });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.updateTodo = async function (req, res) {
    const { todoId } = req.params;
    const { body } = req.body;

    if (!body || !todoId) {
        return res.status(400).json({ msg: "body or id is missing !!" });
    }

    try {
        await Todo.findByIdAndUpdate(todoId, { body });

        res.status(200).json({ msg: "Todo updated successfully." });
    } catch (error) {
        return res.status(400).json({ msg: "invalid id" });
    }
}

exports.fetchAllTodo = async function (req, res) {
    try {
        const user = await User.findById(req.user._id).populate('todos', "_id body");
        console.log("myuser", user.todos);
        const todos = user.todos;
        res.status(200).json({ todos });
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}