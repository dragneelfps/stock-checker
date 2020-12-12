import schedule from "node-schedule"
import {logger} from "./logging";
import {sendMail} from "./mail";
import {CRON_SCHEDULE, pages} from "./config";
import {check, PageConfig} from "./pages/SellerPage";

async function work() {
    const pagesWithResult = new Array<PageConfig & { inStock: boolean }>();
    for (const page of pages) {
        let inStock = await check(page)
        const pageWithResult = {...page, inStock}
        pagesWithResult.push(pageWithResult)
        logger.info(JSON.stringify(pageWithResult))
    }
    const inStockPages = pagesWithResult.filter(({inStock}) => inStock)
    if (inStockPages.length > 0) {
        logger.info(`Sending emails for ${inStockPages.length} pages`)
        let mailBody = ""
        for (const page of inStockPages) {
            mailBody += `${page.url}\n`
        }
        await sendMail({subject: `${inStockPages.length} items are in stock`, body: mailBody})
    }

}

function main() {
    let workId = 0
    const job = schedule.scheduleJob(CRON_SCHEDULE, work)
    job.on("run", () => {
        logger.info(`Started ${++workId}`)
    })
}

main()
