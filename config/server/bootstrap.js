import { errorLogger, infoLogger } from "../logger/logConfig.js";
import { config } from "./config.js";
import database from "./database.js";

// server related works
process.on('uncaughtException', (error) => {
    errorLogger.error(`Error uncaught exception server: ${error.message}`);
    process.exit(1);
});

// server listener
const bootstrap = async (app) => {
    try {
        app.listen(config.PORT, () => {
            infoLogger.info(`Listening on port http://localhost:${config.PORT}/api/v1`);

            // connect database after server started
            database()
        });
    } catch (error) {
        errorLogger.error(`Error creating server: ${error instanceof Error ? error.message : 'unknown'}`);
        process.exit(1);
    }
}

export default bootstrap;