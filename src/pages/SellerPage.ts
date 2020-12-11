export interface SellerPage {
    check(): Promise<boolean>

    url: string
}