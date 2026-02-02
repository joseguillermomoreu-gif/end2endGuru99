import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/world';

// Importar Page Objects existentes
import * as guru99 from '@components/guru99';
import * as login from '@components/guru99/login';
import * as home from '@components/guru99/home';

const env = process.env;

// Given steps - Precondiciones

Given('el usuario está en la página de login', async function (this: CustomWorld) {
  await guru99.gotoHome(this.page);
  await login.isVisible(this.page, true);
});

Given('que los campos de login están vacíos inicialmente', async function (this: CustomWorld) {
  await guru99.gotoHome(this.page);
  await login.isVisible(this.page, true);
  await login.checkEmptyFields(this.page);
});

// When steps - Acciones

When('el usuario introduce las credenciales válidas', async function (this: CustomWorld) {
  const testUser = env.testUser || 'mngr652417';
  const testPass = env.testPass || 'UhEpYne';

  await login.fillUser(this.page, testUser);
  await login.fillPassword(this.page, testPass);

  this.attach(`Credenciales utilizadas - Usuario: ${testUser}`, 'text/plain');
});

When('hace click en el botón de login', async function (this: CustomWorld) {
  await login.clickLogin(this.page);
});

When('el usuario introduce credenciales en el formulario', async function (this: CustomWorld) {
  const testUser = env.testUser || 'mngr652417';
  const testPass = env.testPass || 'UhEpYne';

  await login.fillUser(this.page, testUser);
  await login.fillPassword(this.page, testPass);
});

When('hace click en el botón reset del login', async function (this: CustomWorld) {
  await login.clickReset(this.page);
});

When('el usuario completa el proceso de login con credenciales válidas', async function (this: CustomWorld) {
  const testUser = env.testUser || 'mngr652417';
  const testPass = env.testPass || 'UhEpYne';

  await login.fillUser(this.page, testUser);
  await login.fillPassword(this.page, testPass);
  await login.clickLogin(this.page);
});

When('navego a la página de login', async function (this: CustomWorld) {
  await guru99.gotoHome(this.page);
});

// Then steps - Verificaciones

Then('el usuario debe ser autenticado correctamente', async function (this: CustomWorld) {
  await login.isVisible(this.page, false);
  await this.page.waitForLoadState('networkidle');
});

Then('debe ver el mensaje de bienvenida con su ID de usuario', async function (this: CustomWorld) {
  const testUser = env.testUser || 'mngr652417';
  await home.checkWelcomeMessage(this.page, testUser);
});

Then('no debe ver el formulario de login', async function (this: CustomWorld) {
  await login.isVisible(this.page, false);
});

Then('los campos de usuario y contraseña deben estar vacíos', async function (this: CustomWorld) {
  await login.checkEmptyFields(this.page);
});

Then('el formulario de login debe seguir visible', async function (this: CustomWorld) {
  await login.isVisible(this.page, true);
});

Then('debe acceder al panel de administración', async function (this: CustomWorld) {
  await home.gotoHome(this.page);
  expect(this.page.url()).toContain('Managerhomepage.php');
});

Then('debe ver su ID de manager en la página principal', async function (this: CustomWorld) {
  const testUser = env.testUser || 'mngr652417';

  if (!this.page.url().includes('Managerhomepage.php')) {
    await home.gotoHome(this.page);
  }

  await home.checkWelcomeMessage(this.page, testUser);
});

Then('debo ver todos los elementos del formulario de login', async function (this: CustomWorld) {
  await login.isVisible(this.page, true);
  await login.checkEmptyFields(this.page);
});

Then('debo poder interactuar con los campos de entrada', async function (this: CustomWorld) {
  const testText = 'test';

  await login.fillUser(this.page, testText);
  await login.fillPassword(this.page, testText);

  await expect(this.page.locator('input[name="uid"]')).toHaveValue(testText);
  await expect(this.page.locator('input[name="password"]')).toHaveValue(testText);

  await login.clickReset(this.page);
  await login.checkEmptyFields(this.page);
});
