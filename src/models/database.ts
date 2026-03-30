import { Sequelize } from "sequelize";
const config = require("../config.js");

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.dbPath,
    logging: false,
});
