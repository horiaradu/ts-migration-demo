import express from "express";
import { logger } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.ts";
import postRoutes from "./routes/postRoutes.ts";

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(logger);

    app.get("/health", (_req, res) => {
        res.json({ status: "ok" });
    });

    app.use("/users", userRoutes);
    app.use("/posts", postRoutes);

    return app;
}
