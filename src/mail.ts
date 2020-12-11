import nodemailer from "nodemailer"
import {logger} from "./logging";

const config = {
    email_service: process.env["EMAIL_SERVICE"]!!,
    sender: {
        email: process.env["SENDER_EMAIL"]!!,
        password: process.env["SENDER_PASSWORD"]!!,
    },
    user: {
       email: process.env["USER_EMAIL"]!!
    }

}

const transporter = nodemailer.createTransport({
    service: config.email_service,
    secure: true,
    auth: {
        user: config.sender.email,
        pass: config.sender.password
    }
})

export async function sendMail(data: {subject: string, body: string} ) {
    await transporter.sendMail({
        from: config.sender.email,
        to: config.user.email,
        subject: data.subject,
        html: data.body
    })
    logger.info(`Mail sent to ${config.user.email}`)
}

