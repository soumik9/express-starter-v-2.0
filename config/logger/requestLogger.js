import moment from "moment";
import { httpLogger } from "./logConfig.js";
import getRequestURL from "../../libs/helpers/getRequestURL.js";

const requestLogger = (req, res, next) => {
    const { method } = req;
    const startTime = moment();

    res.on('finish', () => {
        const endTime = moment();
        const duration = endTime.diff(startTime);
        const formattedDuration = moment.duration(duration).asMilliseconds();
        const message = `${method} ${getRequestURL.getRequestFulllUrl(req)} ${res.statusCode} - ${formattedDuration}ms`;
        httpLogger.http(message);
    });

    next();
};

export default requestLogger;