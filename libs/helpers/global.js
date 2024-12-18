import { errorLogger } from "../../config/logger/logConfig.js";

// Catch async errors
export const catchAsync = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error);
        errorLogger.error(error);
    }
};

// Send response
export const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };

    res.status(data.statusCode).json(responseData);
};

// Api error class
export class ApiError extends Error {
    statusCode;

    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Get request full url
export const getRequestFulllUrl = (req) => {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}

// Get request base url
export const getRequestBaseUrl = (req) => {
    return req.protocol + '://' + req.get('host');
}
