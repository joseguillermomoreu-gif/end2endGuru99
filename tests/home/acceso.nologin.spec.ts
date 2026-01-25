import { test } from '@playwright/test';
import * as guru99 from 'components/guru99';
import * as login from 'components/guru99/login';
import * as home from 'components/guru99/home';

const INFO_TEST_HOME_ACCESS = { 
  tag: `@HOME_ACCESS`, 
  annotation: [{ type: 'doc', description: 'Verificar acceso correcto a la página principal de Guru99 Bank' }] 
};
test('Un usuario puede acceder a la página principal de Guru99 Bank', INFO_TEST_HOME_ACCESS, async ({ page }) => {

  await test.step("When: Un usuario accede a la página principal de Guru99 Bank", async () => {
    await guru99.gotoHome(page);
  });

  await test.step("Then: se muestra el formulario de login correctamente", async () => {
    await login.isVisible(page, true);
  });

});


const INFO_TEST_TITLE = { 
  tag: `@TITLE_VERIFICATION`, 
  annotation: [{ type: 'doc', description: 'Verificar que el título de la página sea Guru99 Bank' }] 
};
test('Verificar que el título de la página sea correcto (Guru99 Bank)', INFO_TEST_TITLE, async ({ page }) => {

  await test.step("When: Un usuario accede a la página principal de Guru99 Bank", async () => {
    await guru99.gotoHome(page);
  });

  await test.step("Then: el título HTML es exactamente 'Guru99 Bank Home Page'", async () => {
    await home.checkTitle(page);
  });

});
