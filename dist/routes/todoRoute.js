"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router
    .route("/")
    .get(userController_1.protect, todoController_1.getTodos)
    .post(userController_1.protect, todoController_1.createTodo);
router
    .route("/:todoId")
    .patch(userController_1.protect, todoController_1.updateTodo)
    .delete(userController_1.protect, todoController_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todoRoute.js.map