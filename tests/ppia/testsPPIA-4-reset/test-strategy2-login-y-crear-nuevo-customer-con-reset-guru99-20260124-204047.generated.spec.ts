// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente en Guru99 Bank Home Page usando User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer rellenar el formulario con datos válidos incluyendo email ejemplo@gmail.com sin tildes o caracteres especiales textos cortos pin numérico de 6 dígitos género female y fecha de nacimiento 17/03/1992 y finalmente comprobar que el botón de reset limpia todos los campos del formulario
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-crear-nuevo-customer-con-reset-guru99', async ({ page }) => {

  await test.step("Given: el usuario navega a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario introduce el User ID en el campo correspondiente", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce el Password en el campo correspondiente", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: el menú de usuario y la confirmación del Manager Id son visibles tras login", async () => {
    await expect(page.locator('ul.menusubnav')).toBeVisible();
    await expect(page.locator('tr.heading3 >> td')).toBeVisible();
    const managerIdText = await page.locator('tr.heading3 >> td').textContent();
    console.log('Manager Id visible:', managerIdText);
  });

  await test.step("When: el usuario accede a la sección New Customer", async () => {
    await page.locator('ul.menusubnav').locator('a[href="addcustomerpage.php"]').click();
  });

  await test.step("And: el usuario rellena el formulario New Customer con datos válidos", async () => {
    await page.locator('input[name="name"]').fill('Maria');
    await page.locator('input[value="f"]').check();
    await page.locator('input[name="dob"]').fill('1992-03-17');
    await page.locator('textarea[name="addr"]').fill('Calle 123');
    await page.locator('input[name="city"]').fill('Madrid');
    await page.locator('input[name="state"]').fill('Madrid');
    await page.locator('input[name="pinno"]').fill('280001');
    await page.locator('input[name="telephoneno"]').fill('612345678');
    await page.locator('input[name="emailid"]').fill('ejemplo@gmail.com');
    await page.locator('input[name="password"]').fill('clave123');
  });

  await test.step("And: el usuario hace click en el botón Reset", async () => {
    await page.locator('input[type="reset"]').click();
  });

  await test.step("Then: todos los campos del formulario quedan vacíos tras el reset", async () => {
    const nombre = await page.locator('input[name="name"]').inputValue();
    const genero = await page.locator('input[value="f"]').isChecked();
    const fecha = await page.locator('input[name="dob"]').inputValue();
    const direccion = await page.locator('textarea[name="addr"]').inputValue();
    const ciudad = await page.locator('input[name="city"]').inputValue();
    const estado = await page.locator('input[name="state"]').inputValue();
    const pin = await page.locator('input[name="pinno"]').inputValue();
    const telefono = await page.locator('input[name="telephoneno"]').inputValue();
    const email = await page.locator('input[name="emailid"]').inputValue();
    const pass = await page.locator('input[name="password"]').inputValue();

    await expect(nombre).toBe('');
    await expect(genero).toBeFalsy();
    await expect(fecha).toBe('');
    await expect(direccion).toBe('');
    await expect(ciudad).toBe('');
    await expect(estado).toBe('');
    await expect(pin).toBe('');
    await expect(telefono).toBe('');
    await expect(email).toBe('');
    await expect(pass).toBe('');

    console.log('Campos tras reset:', {
      nombre, genero, fecha, direccion, ciudad, estado, pin, telefono, email, pass
    });
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 20:40:47
⏱️  Tiempo: 86112ms (86.1s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente en Guru99 Bank Home Page usando User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer rellenar el formulario con datos válidos incluyendo email ejemplo@gmail.com sin tildes o caracteres especiales textos cortos pin numérico de 6 dígitos género female y fecha de nacimiento 17/03/1992 y finalmente comprobar que el botón de reset limpia todos los campos del formulario
🔄 Iteraciones: 4 análisis ejecutados
🧠 Tokens: 2348 tokens consumidos
📊 Líneas: 77 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-crear-nuevo-customer-con-reset-guru99
  • Preguntas binarias: 4 configuradas

────────────────────────────────────────────────────────────────

💡 CUÁNDO USAR ESTA ESTRATEGIA
  ✓ Tienes preguntas específicas sobre la página
  ✓ Necesitas validaciones puntuales (existe X, se muestra Y)
  ✓ Quieres guiar a la IA con preguntas concretas
  ✓ Ideal para tests de validación rápidos

────────────────────────────────────────────────────────────────

⚠️  CARACTERÍSTICAS
  • Autonomía: 85% ia
  • Coste: Alto consumo de tokens OpenAI
  • Output: Código Playwright puro y legible
  • Mantenibilidad: El código generado es editable

════════════════════════════════════════════════════════════════
 */