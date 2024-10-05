// utils/error.js
export const errorHandler = (statusCode, message) => {
    const error = new Error(message); // Pass the message to the Error constructor
    error.statusCode = statusCode;
    return error;
};

// Express error handling middleware
export const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
    const message = err.message || 'Internal Server Error'; // Default message
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
    });
};
