import { Page, expect } from "@playwright/test";
import * as selectors from "./selectors";

export async function isFormVisible(page: Page) {
    await expect(page.locator(selectors.nameInputLocator)).toBeVisible();
    await expect(page.locator(selectors.submitButtonLocator)).toBeVisible();
}

export async function fillFieldValue(page: Page, field: string, value: string) {
    const locator = selectors.fieldMap[field];
    if (locator) {
        await expect(page.locator(locator)).toBeVisible();
        await page.locator(locator).fill(value);
        await expect(page.locator(locator)).toHaveValue(value);
    }
}

export async function fillFieldValueAndTab(page: Page, field: string, value: string) {
    const locator = selectors.fieldMap[field];
    if (locator) {
        await page.locator(locator).fill(value);
        await expect(page.locator(locator)).toHaveValue(value);
        // Tab para triggear validación del campo
        await page.locator(locator).press('Tab');
    }
}

export async function fillValues(page: Page, name: string, dob: string, address: string, city: string, state: string, pin: string, telephone: string, email: string, password: string) {
    await fillFieldValue(page, 'name', name);
    await fillFieldValue(page, 'dob', dob);
    await fillFieldValue(page, 'address', address);
    await fillFieldValue(page, 'city', city);
    await fillFieldValue(page, 'state', state);
    await fillFieldValue(page, 'pin', pin);
    await fillFieldValue(page, 'telephone', telephone);
    await fillFieldValue(page, 'email', email);
    await fillFieldValue(page, 'password', password);
}

export async function submitForm(page: Page) {
    await page.locator(selectors.submitButtonLocator).click();
}

export async function submitFormAndCheckAlert(page: Page, expectedErrorMessage: string): Promise<string> {
    let alertMessage = '';
    page.once('dialog', async dialog => {
        alertMessage = dialog.message();
        await dialog.accept();
    });
    await submitForm(page);
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000);
    expect(alertMessage.length).toBeGreaterThan(0);
    expect(alertMessage).toContain(expectedErrorMessage);
    return alertMessage;
}

export async function resetForm(page: Page) {
    await page.locator(selectors.resetButtonLocator).click();
}

export async function checkConfirmationTable(page: Page, expectedName: string, expectedAddress: string, expectedCity: string, expectedPin: string, expectedTelephone: string, expectedEmail: string) {
    const table = page.locator(selectors.confirmationTableLocator);
    await expect(table).toBeVisible();

    const tableText = await table.textContent();
    expect(tableText).toContain(expectedName);
    expect(tableText).toContain(expectedAddress);
    expect(tableText).toContain(expectedCity);
    expect(tableText).toContain(expectedPin);
    expect(tableText).toContain(expectedTelephone);
    expect(tableText).toContain(expectedEmail);
}

export async function checkEmptyForm(page: Page) {
    await expect(page.locator(selectors.nameInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.dobInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.addressTextareaLocator)).toHaveValue('');
    await expect(page.locator(selectors.cityInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.stateInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.pinInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.telephoneInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.emailInputLocator)).toHaveValue('');
    await expect(page.locator(selectors.passwordInputLocator)).toHaveValue('');
}

export async function clickHome(page: Page) {
    await page.locator(selectors.homeLinkLocator).click();
}

export async function checkErrorText(page: Page, expectedError: string) {
    await expect(page.getByText(expectedError)).toBeVisible();
}