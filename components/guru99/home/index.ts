import { Page, expect } from "@playwright/test";
import * as selectors from "./selectors";

export async function checkTitle(page: Page) {
    expect(await page.title()).toBe(selectors.titleText);
}

export async function checkWelcomeMessage(page: Page, user: string) {
    await expect(page.locator(selectors.managerIdRowLocator, { hasText: `Manger Id : ${user}` })).toBeVisible();
}