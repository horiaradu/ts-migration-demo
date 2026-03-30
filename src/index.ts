// In CJS, this runs before the require() calls that imports compile to.
// In ESM, imports are hoisted above this — so config.js reads DB_PATH
// before it's set, and falls back to ":memory:".
process.env.DB_PATH = ":memory:";

import { sequelize } from "./models/index.ts";
import { createApp } from "./app.ts";

import config from "./config.js";

async function main() {
    await sequelize.sync({ force: false });
    console.log("Database synced");

    const app = createApp();
    app.listen(config.port, () => {
        console.log(`${config.appName} running on port ${config.port}`);
    });
}

main().catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
});
