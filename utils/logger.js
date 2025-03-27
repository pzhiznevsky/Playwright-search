import winston from 'winston';

// Create a Winston logger
const logger = winston.createLogger({
    level: 'info',  // Set log level (info, debug, error, etc.)
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),  // Log to console
        new winston.transports.File({ filename: 'logs/test.log' })  // Save to file
    ]
});

export default logger;