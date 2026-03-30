// @ts-check

/** @type {{ port: number, dbPath: string, appName: string }} */
const config = {
    port: parseInt(process.env.PORT || "3000", 10),
    dbPath: process.env.DB_PATH || ":memory:",
    appName: "ts-migration-demo",
};

export default config;
