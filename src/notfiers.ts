import {logger} from "./logging"
import {notifications} from "./config";

export type NotifierType = (urls: string[]) => Promise<void>

export async function getNotifier(): Promise<NotifierType> {
    const notifiers = new Array<NotifierType>()
    if (notifications.telegram.enabled) {
        notifiers.push(await telegramNotifier())
    }
    if (notifications.email.enabled) {
        notifiers.push(await mailNotifier())
    }
    return async function notify(urls) {
        for (const notifier of notifiers) {
            await notifier(urls)
        }
    }
}

async function telegramNotifier(): Promise<NotifierType> {
    const TelegramBot = (await import("node-telegram-bot-api")).default
    const token = notifications.telegram.token!!
    const bot = new TelegramBot(token, {polling: true})

    const chatId = notifications.telegram.chatId!!

    return async function notifyTelegram(urls: string[]) {
        logger.info("Notifying via telegram")
        await bot.sendMessage(chatId, urls.join("\n"))
        logger.info(`Message sent to chat id ${chatId}`)
    }
}

async function mailNotifier(): Promise<NotifierType> {
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
        service: notifications.email.email_service,
        secure: true,
        auth: {
            user: notifications.email.sender.email,
            pass: notifications.email.sender.password
        }
    })

    return async function sendMail(urls) {
        logger.info("Notifying via email")
        const mailBody = urls.join("\n")
        const subject = `${urls.length} items are in stock`

        await transporter.sendMail({
            from: notifications.email.sender.email,
            to: notifications.email.user.email,
            subject: subject,
            html: mailBody
        })
        logger.info(`Mail sent to ${notifications.email.user.email}`)
    }
}
