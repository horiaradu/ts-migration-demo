import { Sequelize } from "sequelize";
const config = require("../config");

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.dbPath,
    logging: false,
});
