import { Router, Request, Response } from "express";
import { Post, User, Comment } from "../models/index.ts";
import { PostStatus } from "../types.ts";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    const posts = await Post.findAll({
        include: [
            { model: User, as: "author", attributes: ["id", "name"] },
            { model: Comment, as: "comments" },
        ],
        order: [["createdAt", "DESC"]],
    });
    res.json(posts);
});

router.get("/:id", async (req: Request, res: Response) => {
    const post = await Post.findByPk(req.params.id, {
        include: [
            { model: User, as: "author", attributes: ["id", "name"] },
            { model: Comment, as: "comments" },
        ],
    });
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.json(post);
});

router.post("/", async (req: Request, res: Response) => {
    const { title, body, userId, status } = req.body as {
        title: string;
        body: string;
        userId: number;
        status?: PostStatus;
    };
    const post = await Post.create({ title, body, userId, status: status ?? PostStatus.Draft });
    res.status(201).json(post);
});

export default router;
