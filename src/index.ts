import { sequelize } from "./models";
import { createApp } from "./app";
const config = require("./config");

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
