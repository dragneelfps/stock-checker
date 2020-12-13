import schedule from "node-schedule"
import {logger} from "./logging";
import {CRON_SCHEDULE, pages} from "./config";
import {check, PageConfig} from "./pages/SellerPage";
import {getNotifier, NotifierType} from "./notfiers";

async function work(notify: NotifierType) {
    const pagesWithResult = new Array<PageConfig & { inStock: boolean }>();
    for (const page of pages) {
        let inStock = await check(page)
        const pageWithResult = {...page, inStock}
        pagesWithResult.push(pageWithResult)
        logger.info(JSON.stringify(pageWithResult))
    }
    const inStockPages = pagesWithResult.filter(({inStock}) => inStock)
    if (inStockPages.length > 0) {
        await notify(inStockPages.map(({url}) => url))
    }
}

async function main() {
    const notify = await getNotifier()
    let workId = 0
    const job = schedule.scheduleJob(CRON_SCHEDULE, () => work(notify))
    job.on("run", () => {
        logger.info(`Started ${++workId}`)
    })
}

main()
    .catch(e => logger.error(e))
