import { Router } from "express";

import { getErrorMessage } from "../utils/errorUtils.js";
import { userService } from "../services/index.js";

const userController = Router();

userController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.register(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

userController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.login(userData);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

userController.get("/logout", (req, res) => {
    res.status(204).json({ ok: true });
});

export default userController;
