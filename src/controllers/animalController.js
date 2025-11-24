import { Router } from "express";

import { animalService } from "../services/index.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const animalController = Router();

animalController.get("/", async (req, res) => {
    try {
        const data = await animalService.getAll(req.query);
        res.json(data);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.post("/", async (req, res) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const post = await animalService.create(data, userId);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.get("/home-photos", async (req, res) => {
    try {
        const photos = await animalService.getPhotosHome();
        res.status(200).json(photos);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.get("/:postId", async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await animalService.getOne(postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.post("/likes/:postId", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;

    try {
        const post = await animalService.sendLike(postId, userId);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.post("/dislikes/:postId", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;

    try {
        const post = await animalService.removeLike(postId, userId);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.delete("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;

    try {
        const data = await animalService.deleteF(postId, userId);
        res.status(204).json(data);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

animalController.put("/:postId", async (req, res) => {
    const data = req.body;
    const postId = req.params.postId;

    try {
        const updated = await animalService.edit(data, postId);
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) });
    }
});

export default animalController;
