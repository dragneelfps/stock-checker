import {MDComputersChecker, RPTechIndiaChecker, VedantComputersChecker} from "./checkers";

export type PageConfig = {
    url: string,
    page: PageType
}
export type PageType = "RPTechIndia" | "MDComputers" | "VedantComputers"

export function check(pageConfig: PageConfig): Promise<boolean> {
    let checker: StatusChecker
    switch (pageConfig.page) {
        case "RPTechIndia":
            checker = RPTechIndiaChecker; break
        case "MDComputers":
            checker = MDComputersChecker; break
        case "VedantComputers":
            checker = VedantComputersChecker; break
    }
    return checker(pageConfig.url)
}

export type StatusChecker = (url: string) => Promise<boolean>
