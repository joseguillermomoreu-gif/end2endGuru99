import { Page } from "@playwright/test";

const env = process.env;

export async function gotoHome(page: Page) {
    await page.goto(`${env.baseUrl}${env.domain}/${env.version}/`);
}