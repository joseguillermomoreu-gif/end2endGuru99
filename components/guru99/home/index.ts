import { Page, expect } from "@playwright/test";
import * as selectors from "./selectors";

export async function checkTitle(page: Page) {
    expect(await page.title()).toBe(selectors.titleText);
}