import { ZodError } from 'zod';
import { MulterError } from 'multer';
import httpStatus from 'http-status';

import { config } from '../server/config.js';
import CastErrorHandler from './CastErrorHandler.js';
import ZodErrorHandler from './ZodErrorHandler.js';
import ValidationErrorHandler from './ValidationErrorHandler.js';
import { ApiError } from '../../libs/helpers/global.js';

const GlobalErrorHandler = (error, req, res) => {

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError = ValidationErrorHandler(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ZodError) {
        const simplifiedError = ZodErrorHandler(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.name === 'CastError') {
        const simplifiedError = CastErrorHandler(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof MulterError) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorMessages,
        stack: config.ENV !== 'production' ? error?.stack : undefined,
    });
};

export default GlobalErrorHandler;