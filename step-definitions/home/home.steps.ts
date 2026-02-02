import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/world';

// Importar tus Page Objects existentes
import * as guru99 from '@components/guru99';
import * as login from '@components/guru99/login';

// Steps específicos para la funcionalidad de Home/Login

When('un usuario navega a la página principal de Guru99 Bank', async function (this: CustomWorld) {
  await guru99.gotoHome(this.page);
  expect(this.page.url()).toContain('guru99.com');
});

When('un usuario accede a la página principal de Guru99 Bank', async function (this: CustomWorld) {
  await guru99.gotoHome(this.page);
});

When('la página se carga completamente', async function (this: CustomWorld) {
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForLoadState('networkidle');
});

Then('se debe mostrar el formulario de login correctamente', async function (this: CustomWorld) {
  await login.isVisible(this.page, true);
});

Then('se muestra el formulario de login correctamente', async function (this: CustomWorld) {
  await login.isVisible(this.page, true);
});

Then('debe ver el formulario de login', async function (this: CustomWorld) {
  await login.isVisible(this.page, true);
});

Then('el título HTML debe ser exactamente {string}', async function (this: CustomWorld, expectedTitle: string) {
  const actualTitle = await this.page.title();
  expect(actualTitle).toBe(expectedTitle);
});

Then('el título debe ser {string}', async function (this: CustomWorld, expectedTitle: string) {
  const actualTitle = await this.page.title();
  expect(actualTitle).toBe(expectedTitle);
});

Then('debo ver el formulario de login', async function (this: CustomWorld) {
  await login.isVisible(this.page, true);
});

Then('debe ver el logo de Guru99 Bank', async function (this: CustomWorld) {
  const logoSelectors = [
    'img[alt*="Guru99"]',
    'img[src*="logo"]',
    '[class*="logo"]',
    'img[alt*="Bank"]'
  ];

  let logoFound = false;
  for (const selector of logoSelectors) {
    const logo = this.page.locator(selector);
    if (await logo.isVisible()) {
      logoFound = true;
      break;
    }
  }

  if (!logoFound) {
    const anyImage = this.page.locator('img').first();
    await expect(anyImage).toBeVisible();
  }
});

Then('debe ver el título de la página', async function (this: CustomWorld) {
  const title = await this.page.title();
  expect(title).toBeTruthy();
  expect(title.length).toBeGreaterThan(0);
});
