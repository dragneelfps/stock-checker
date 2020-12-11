import schedule from "node-schedule"
import {logger} from "./logging";
import {SellerPage} from "./pages/SellerPage";
import {RPTechIndia} from "./pages/RPTechIndia";
import {sendMail} from "./mail";

const pages: SellerPage[] = [
    new RPTechIndia("https://rptechindia.in/nvidia-geforce-rtx-3060-ti.html"),
    new RPTechIndia("https://rptechindia.in/catalog/product/view/id/2476/s/hp-monitor-22f-3aj92aa-acj/")
]

async function work() {
    const pageResults = new Map<SellerPage, boolean>();
    const inStockPages = new Array<SellerPage>()
    for (const page of pages) {
        pageResults.set(page, await page.check())
    }
    for (const [page, inStock] of pageResults.entries()) {
        if (inStock) {
            logger.info(`In Stock: ${page.url}`)
            inStockPages.push(page)
        } else {
            logger.info(`Out of Stock: ${page.url}`)
        }
    }
    if(inStockPages.length > 0) {
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
    const job = schedule.scheduleJob(process.env["RECHECK_CRON_SCHEDULE"]!!, work)
    job.on("run", () => {
        logger.info(`Started ${++workId}`)
    })
}

main()