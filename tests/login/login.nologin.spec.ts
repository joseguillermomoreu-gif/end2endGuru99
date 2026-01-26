import { test } from '@playwright/test';
import * as guru99 from 'components/guru99';
import * as login from 'components/guru99/login';
import * as home from 'components/guru99/home';

const env = process.env;

const INFO_TEST_LOGIN = { tag: `@LOGIN_SUCCESS`, annotation: [{ type: 'doc', description: 'Verificar login exitoso con credenciales correctas' },] };
test('Plantear un caso de prueba positivo con credenciales correctas', INFO_TEST_LOGIN, async ({ page }) => {

    await test.step("Given: Un usuario no loggeado navega a la página de login de Guru99 Bank", async () => {
        await guru99.gotoHome(page);
        await login.isVisible(page, true);
    });

    await test.step("When: El usuario introduce credenciales validas y hace click en submit", async () => {
        await login.fillUser(page, env.testUser);
        await login.fillPassword(page, env.testPass);
        await login.clickLogin(page);
        await login.isVisible(page, false);
    });

    await test.step("Then: se muestra mensaje de bienvenida", async () => {
        await home.checkWelcomeMessage(page, env.testUser);
    });

});

const INFO_TEST_RESET = { tag: `@RESET_BUTTON`, annotation: [{ type: 'doc', description: 'Verificar que el botón reset cumple su cometido en la página de login' },] };
test('Comprobar que el botón reset cumple su cometido', INFO_TEST_RESET, async ({ page }) => {

    await test.step("Given: Un usuario navega a la página de login de Guru99 Bank", async () => {
        await guru99.gotoHome(page);
        await login.isVisible(page, true);
    });

    await test.step("When: El usuario introduce credenciales validas y hace click en reset", async () => {
        await login.fillUser(page, env.testUser);
        await login.fillPassword(page, env.testPass);
        await login.clickReset(page);
    });

    await test.step("Then: Los campos de usuario y contraseña se vacían completamente", async () => {
        await login.checkEmptyFields(page);
    });

});
