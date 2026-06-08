"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const User_1 = __importDefault(require("../models/User"));
const getTodos = async (req, res) => {
    try {
        const userId = req.user?.id;
        const todos = await Todo_1.default.findAll({
            where: { user_id: userId },
            include: { model: User_1.default, attributes: { exclude: ["password", "created_at", "updated_at"] } },
            attributes: { exclude: [] }
        });
        res.status(200).json({
            status: "success",
            data: todos
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err
        });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const body = req.body;
        body.user_id = req.user?.id;
        const todo = await Todo_1.default.create(body);
        res.status(200).json({
            status: "success",
            data: todo
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err
        });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo_1.default.findOne({ where: { id: todoId } });
        todo.content = req.body.content;
        todo?.save();
        res.status(200).json({
            status: "success",
            data: todo
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err
        });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo_1.default.destroy({ where: { id: todoId } });
        res.status(204).json({});
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err
        });
    }
};
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todoController.js.map