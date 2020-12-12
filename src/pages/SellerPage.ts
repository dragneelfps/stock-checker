import {RPTechIndiaChecker} from "./RPTechIndia";

export type PageConfig = {
    url: string,
    page: PageType
}
export type PageType = "RPTechIndia"

export function check(pageConfig: PageConfig): Promise<boolean> {
    switch (pageConfig.page) {
        case "RPTechIndia":
            return RPTechIndiaChecker(pageConfig.url)
    }
}

export type StatusChecker = (url: string) => Promise<boolean>
