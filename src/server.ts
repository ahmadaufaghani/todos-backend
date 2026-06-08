import express from "express";
import UserRouter from "./routes/userRoute";
import TodoRouter from "./routes/todoRoute";
import morgan from "morgan";
import cors from "cors";
import "./db/sequelize";


const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/users", UserRouter);
app.use("/api/todos", TodoRouter);

export default app;


