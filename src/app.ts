import express from "express";
const { logger } = require("./middleware/logger");
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

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
