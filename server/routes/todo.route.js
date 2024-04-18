const { Router } = require("express");
const { updateTodo, addTodo, deleteTodo, fetchAllTodo } = require("../controllers/todo.controllers");
const { auth } = require("../middleware/auth.middleware");
const todoRouter = Router();

todoRouter.post("/addtodo", auth, addTodo);
todoRouter.get("/fetchalltodo", auth, fetchAllTodo);
todoRouter.delete("/deletetodo/:todoId", auth, deleteTodo);
todoRouter.patch("/updatetodo/:todoId", auth, updateTodo);

module.exports = todoRouter;