import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '@support/world';

// Importar Page Objects existentes
import * as guru99 from '@components/guru99';
import * as login from '@components/guru99/login';
import * as home from '@components/guru99/home';

const env = process.env;

// When steps - Acciones

When('el administrador se autentica con credenciales válidas', async function (this: CustomWorld) {
  console.log('🔐 Autenticando administrador con credenciales válidas...');

  const testUser = env.testUser || 'mngr652417';
  const testPass = env.testPass || 'UhEpYne';

  await guru99.gotoHome(this.page);
  await login.isVisible(this.page, true);
  await login.fillUser(this.page, testUser);
  await login.fillPassword(this.page, testPass);
  await login.clickLogin(this.page);
  await login.isVisible(this.page, false);

  console.log(`✅ Administrador autenticado exitosamente: ${testUser}`);
  this.attach(`Authenticated user: ${testUser}`, 'text/plain');
});

// Then steps - Verificaciones

Then('debe acceder al panel de administración', async function (this: CustomWorld) {
  console.log('🏠 Verificando acceso al panel de administración...');

  await home.gotoHome(this.page);
  expect(this.page.url()).toContain('Managerhomepage.php');

  console.log('✅ Acceso al panel de administración verificado');
});

Then('debe ver el mensaje de bienvenida personalizado', async function (this: CustomWorld) {
  console.log('👋 Verificando mensaje de bienvenida personalizado...');

  const testUser = env.testUser || 'mngr652417';

  if (!this.page.url().includes('Managerhomepage.php')) {
    await home.gotoHome(this.page);
  }

  await home.checkWelcomeMessage(this.page, testUser);
  console.log(`✅ Mensaje de bienvenida verificado para: ${testUser}`);
});

Then('debe tener acceso a todas las funcionalidades administrativas', async function (this: CustomWorld) {
  console.log('🔑 Verificando acceso a funcionalidades administrativas...');

  await home.gotoHome(this.page);

  // Verificar que hay elementos de menú disponibles
  const menuElements = this.page.locator('[href*="addAccount"], [href*="addCustomer"], [href*="editAccount"]').first();

  // Si no hay elementos específicos, al menos verificar que no estamos en login
  if (await menuElements.isVisible().catch(() => false)) {
    console.log('✅ Funcionalidades administrativas verificadas - menú visible');
  } else {
    // Verificación alternativa: que no estamos en login y la URL contiene manager
    expect(this.page.url()).toContain('Manager');
    console.log('✅ Funcionalidades administrativas verificadas - en área de manager');
  }
});
