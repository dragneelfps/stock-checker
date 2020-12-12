import {PageConfig} from "./pages/SellerPage";

export const CRON_SCHEDULE = process.env["RECHECK_CRON_SCHEDULE"]!!

export const mail = {
    email_service: process.env["EMAIL_SERVICE"]!!,
    sender: {
        email: process.env["SENDER_EMAIL"]!!,
        password: process.env["SENDER_PASSWORD"]!!,
    },
    user: {
        email: process.env["USER_EMAIL"]!!
    }
}

export const pages: PageConfig[] = [
    {
        url: "https://rptechindia.in/nvidia-geforce-rtx-3060-ti.html",
        page: "RPTechIndia"
    },
    {
        url: "https://mdcomputers.in/gigabyte-rtx-3060-ti-gv-n306teagle-8gd.html",
        page: "MDComputers"
    },
    {
        url: "https://www.vedantcomputers.com/gigabyte-geforce-rtx-3060-ti-eagle-oc-8gb-gddr6?search=3060&description=true",
        page: "VedantComputers"
    }
]
