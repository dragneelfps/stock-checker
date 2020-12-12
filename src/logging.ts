import {createLogger, format, transports} from "winston";

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: () => {
                return new Date().toLocaleString("en-us", {timeZone: "Asia/Calcutta"})
            }
        }),
        format.simple()
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: "app.log"})
    ],
    exceptionHandlers: [
        new transports.File({filename: 'error.log'})
    ]
})
