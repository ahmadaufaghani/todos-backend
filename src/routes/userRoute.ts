import express from "express";
import {protect, register, getUserById, login} from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router
    .route('/:userId')
    .get(protect, getUserById)

export default router;