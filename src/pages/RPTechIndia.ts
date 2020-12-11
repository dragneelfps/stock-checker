import {SellerPage} from "./SellerPage";
import puppeteer from "puppeteer";
import {logger} from "../logging";
import cheerio from "cheerio";

export class RPTechIndia implements SellerPage {
    constructor(readonly url: string) {
    }

    async check(): Promise<boolean> {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        logger.info(`Checking ${this.url}`)

        await page.goto(this.url)

        const $ = cheerio.load(await page.content())

        const availability = $("span.rs2").html()

        if (!availability) {
            throw new Error("html error")
        }

        const inStock = availability.toLowerCase().includes("in stock")

        await browser.close()

        return inStock
    }
}