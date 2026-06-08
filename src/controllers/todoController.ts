import {Response, Request} from "express-serve-static-core";
import Todo from "../models/Todo";
import User from "../models/User";


interface TodoPayload {
    content: string,
    status: string,
    user_id: number
}

export const getStats = async (req: Request, res: Response) => {
    try {
        const total = await Todo.count();
        const finish = await Todo.count({where: {status : "done"}});
        const usersTotal = await User.count();
        res.status(200).json({
            status:"success",
            total: total,
            finish: finish,
            usersTotal : usersTotal
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: (err as Error).message
        })
    }
}

export const getTodos = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const todos = await Todo.findAll({
            where: {user_id: userId}, 
            include: {model: User, attributes: {exclude: ["password", "created_at", "updated_at"]}},
            attributes: {exclude: []}
        });
        res.status(200).json({
            status:"success",
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: (err as Error).message
        });
    }
}

export const createTodo = async (req: Request<{},{}, TodoPayload>, res: Response) => {
    try {
        const body = req.body;
        body.user_id = req.user?.id as number;
        const todo = await Todo.create(body);
        res.status(200).json({
            status:"success",
            data: todo
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: (err as Error).message
        });
    }
}

export const updateTodo = async (req : Request<{todoId: string},{}, TodoPayload>, res: Response) => {
    try {
        const todoId = req.params.todoId;
        const body = req.body;
        const todo = await Todo.findOne({where: {id: todoId}}); 
        if(body.content) {
            todo!.content = body.content;
        }

        if(body.status) {
            todo!.status = body.status;
        }
        
        todo?.save();
        res.status(200).json({
            status:"success",
            data: todo
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: (err as Error).message
        });
    }
}


export const deleteTodo = async (req : Request<{todoId: string},{}, TodoPayload>, res: Response) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.destroy({where: {id: todoId}}); 
        res.status(204).json({});
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: (err as Error).message
        });
    }
}