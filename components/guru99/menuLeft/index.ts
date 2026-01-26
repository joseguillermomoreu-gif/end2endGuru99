import { Page, expect } from "@playwright/test";
import * as selectors from "./selectors";

export async function isVisible(page: Page) {
    await expect(page.locator(selectors.menuSubNavLocator)).toBeVisible();
}

export async function clickNewCustomer(page: Page) {
    await expect(page.locator(selectors.newCustomerLinkLocator)).toBeVisible();
    await page.locator(selectors.newCustomerLinkLocator).click();
}
