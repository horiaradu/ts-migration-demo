import { sequelize } from "./models/index.ts";
import { createApp } from "./app.ts";
const config = require("./config.js");

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
