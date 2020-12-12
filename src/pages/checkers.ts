import {StatusChecker} from "./SellerPage";
import puppeteer from "puppeteer";
import {logger} from "../logging";
import cheerio from "cheerio";

let browser: puppeteer.Browser | undefined
let page: puppeteer.Page | undefined


async function loadPage(url: string): Promise<cheerio.Root> {
    if (!browser || !browser.isConnected()) {
        browser = await puppeteer.launch()
    }
    page = await browser.newPage()
    logger.info(`Checking ${url}`)
    await page.goto(url)
    const content = await page.content()
    await page.close()
    return cheerio.load(content)
}

export const RPTechIndiaChecker: StatusChecker = async url => {
    const $ = await loadPage(url)

    const availability = $("span.rs2").html()

    if (!availability) {
        throw new Error("html error")
    }

    return availability.toLowerCase().includes("in stock")
}

export const MDComputersChecker: StatusChecker = async url => {
    const $ = await loadPage(url)
    const availability = $("div.stock").html()

    if (!availability) {
        throw new Error("html error")
    }

    return availability.toLowerCase().includes("in stock")
}

export const VedantComputersChecker: StatusChecker = async url => {
    const $ = await loadPage(url)
    const info = $("div.product-info")
    if (!info) {
        throw new Error("html error")
    }
    return !info.hasClass("out-of-stock")
}
