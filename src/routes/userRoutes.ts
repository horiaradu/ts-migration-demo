import { Router, Request, Response } from "express";
import { User } from "../models/index.ts";
import { Role } from "../types.ts";
const { compact } = require("../utils.js");

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });
    res.json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
    const { name, email, role } = req.body as {
        name: string;
        email: string;
        role?: Role;
    };
    const user = await User.create(compact({ name, email, role }));
    res.status(201).json(user);
});

export default router;
