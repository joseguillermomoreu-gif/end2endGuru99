import { Page, expect } from "@playwright/test";
import * as selectors from "./selectors";

export async function isVisible(page: Page, visible: boolean) {
    if (visible) {
        await expect(page.locator(selectors.inputNameLocator)).toBeVisible();
        await expect(page.locator(selectors.inputPasswordLocator)).toBeVisible();
        await expect(page.locator(selectors.btnLoginLocator)).toBeVisible();
    } else {
        await expect(page.locator(selectors.inputNameLocator)).toBeHidden();
        await expect(page.locator(selectors.inputPasswordLocator)).toBeHidden();
        await expect(page.locator(selectors.btnLoginLocator)).toBeHidden();
    }
}

export async function fillUser(page: Page, username: string) {
    await page.locator(selectors.inputNameLocator).fill(username);
    await expect(page.locator(selectors.inputNameLocator)).toHaveValue(username);
}

export async function fillPassword(page: Page, password: string) {
    await page.locator(selectors.inputPasswordLocator).fill(password);
    await expect(page.locator(selectors.inputPasswordLocator)).toHaveValue(password);
}

export async function clickLogin(page: Page) {
    await page.locator(selectors.btnLoginLocator).click();
}