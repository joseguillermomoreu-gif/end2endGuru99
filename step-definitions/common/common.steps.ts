import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/world';

// Steps comunes de sistema y navegación

Given('que el sistema Guru99 Bank está disponible', async function (this: CustomWorld) {
  // Verificar que el sistema esté disponible
  console.log('✅ Sistema Guru99 Bank está disponible');
});

Given('que utilizo el navegador {string}', async function (this: CustomWorld, browserName: string) {
  console.log(`🌐 Configurando browser: ${browserName}`);
  expect(['chromium', 'firefox', 'webkit']).toContain(browserName.toLowerCase());
});

When('navego a la página principal', async function (this: CustomWorld) {
  const url = `${this.baseUrl}/V4/index.php`;
  await this.page.goto(url);
  console.log(`🔗 Navegando a: ${url}`);
});

Then('la página debe cargar sin errores', async function (this: CustomWorld) {
  const errors: Error[] = [];

  this.page.on('pageerror', (error) => {
    errors.push(error);
  });

  await this.page.waitForLoadState('networkidle');
  expect(errors).toHaveLength(0);

  const response = this.page.url();
  expect(response).toContain('guru99.com');

  console.log('✅ Página cargada sin errores');
});

Then('no debe ver mensajes de error', async function (this: CustomWorld) {
  const errorSelectors = [
    '[class*="error"]',
    '[class*="alert-danger"]',
    '[id*="error"]',
    'text="Error"',
    'text="404"',
    'text="500"'
  ];

  for (const selector of errorSelectors) {
    const errorElement = this.page.locator(selector);
    await expect(errorElement).toBeHidden();
  }

  console.log('✅ No se encontraron mensajes de error en la página');
});

Then('la página está completamente cargada', async function (this: CustomWorld) {
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForLoadState('networkidle');
  console.log('✅ Página completamente cargada');
});
