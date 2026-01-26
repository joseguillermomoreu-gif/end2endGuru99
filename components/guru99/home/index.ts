import { Page, expect } from "@playwright/test";
import * as selectors from "./selectors";

const env = process.env;
export async function gotoHome(page: Page) {
    await page.goto(`${env.baseUrl}${env.domain}/${env.version}/manager/Managerhomepage.php`);
}

export async function checkTitle(page: Page) {
    expect(await page.title()).toBe(selectors.titleText);
}

export async function checkWelcomeMessage(page: Page, user: string) {
    await expect(page.locator(selectors.managerIdRowLocator, { hasText: `Manger Id : ${user}` })).toBeVisible();
}