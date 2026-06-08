"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("./db/sequelize");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)());
app.use("/api/users", userRoute_1.default);
app.use("/api/todos", todoRoute_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map