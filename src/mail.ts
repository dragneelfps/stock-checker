import nodemailer from "nodemailer"
import {logger} from "./logging";
import {mail} from "./config";

const transporter = nodemailer.createTransport({
    service: mail.email_service,
    secure: true,
    auth: {
        user: mail.sender.email,
        pass: mail.sender.password
    }
})

export async function sendMail(data: { subject: string, body: string }) {
    await transporter.sendMail({
        from: mail.sender.email,
        to: mail.user.email,
        subject: data.subject,
        html: data.body
    })
    logger.info(`Mail sent to ${mail.user.email}`)
}

