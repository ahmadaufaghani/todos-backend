"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.register = exports.login = exports.protect = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerifyPromisified = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, {}, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
};
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.header("authorization") && req.header("authorization")?.startsWith("Bearer")) {
            token = req.header("authorization")?.split(" ")[1];
        }
        if (!token) {
            return res.status(400).json({
                status: "error",
                message: "You're not logged in! Please log in."
            });
        }
        const decoded = await jwtVerifyPromisified(token, process.env.JWT_SECRET || "my-todos-identifier");
        const currentUser = await User_1.default.findOne({ where: { id: decoded.id } });
        if (!currentUser) {
            return res.status(400).json({
                status: "error",
                message: "User doesn't exist!"
            });
        }
        req.user = currentUser;
        next();
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
exports.protect = protect;
const login = async (req, res) => {
    try {
        const body = req.body;
        const user = await User_1.default.findOne({
            where: { username: body.username }
        });
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                status: "error",
                message: "Please provide username and password!"
            });
        }
        if (!user || !(await bcrypt_1.default.compare(body.password, user.password))) {
            return res.status(401).json({
                status: "error",
                message: "Username or password incorrect!"
            });
        }
        const secretKey = process.env.JWT_SECRET || "my-todos-identifier";
        const expires = process.env.JWT_EXPIRES_IN || "30d";
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, {
            expiresIn: expires
        });
        res.status(200).json({
            status: "success",
            token: token,
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const body = req.body;
        if (req.body.password.length < 8) {
            return res.status(400).json({
                status: "error",
                message: "Password length must be 8 or more!"
            });
        }
        if (!body.username || !body.password) {
            return res.status(400).json({
                status: "error",
                message: "Please enter your username and password!"
            });
        }
        const user = await User_1.default.create(body);
        const secretKey = process.env.JWT_SECRET || "my-todos-identifier";
        const expires = process.env.JWT_EXPIRES_IN || "30d";
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secretKey, {
            expiresIn: expires
        });
        res.status(200).json({
            status: "success",
            token: token,
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
exports.register = register;
const getUserById = async (req, res) => {
    try {
        const params = req.params.userId;
        const user = await User_1.default.findOne({
            where: { id: Number(params) }
        });
        res.status(200).json({
            status: "success",
            data: user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map