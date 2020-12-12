import {StatusChecker} from "./SellerPage";
import puppeteer from "puppeteer";
import {logger} from "../logging";
import cheerio from "cheerio";

export const RPTechIndiaChecker: StatusChecker = async url => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    logger.info(`Checking ${url}`)

    await page.goto(url)

    const $ = cheerio.load(await page.content())

    const availability = $("span.rs2").html()

    if (!availability) {
        throw new Error("html error")
    }

    const inStock = availability.toLowerCase().includes("in stock")

    await browser.close()

    return inStock
}
