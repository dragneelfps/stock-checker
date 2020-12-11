import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => {
                return new Date().toLocaleString("en-us", {timeZone: "Asia/Calcutta"})
            }
        }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "app.log"})
    ]
})