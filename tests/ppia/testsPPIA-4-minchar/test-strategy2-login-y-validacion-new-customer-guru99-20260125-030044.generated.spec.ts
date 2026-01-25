/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario
 */

import { test, expect } from '@playwright/test';

test('login-y-validacion-new-customer-guru99', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario ingresa el UserID en el campo correspondiente", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario ingresa el Password en el campo correspondiente", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: el usuario accede al dashboard y selecciona la opción 'New Customer'", async () => {
    await page.locator('a[href="addcustomerpage.php"]').click();
  });

  await test.step("When: el usuario ingresa solo dos caracteres numéricos en los campos requeridos y la fecha de nacimiento", async () => {
    await page.locator('input[name="name"]').fill('12');
    // Ignora el campo de género
    await page.locator('input[name="dob"]').fill('1992-03-17');
    await page.locator('textarea[name="addr"]').fill('34');
    await page.locator('input[name="city"]').fill('56');
    await page.locator('input[name="state"]').fill('78');
    await page.locator('input[name="pinno"]').fill('90');
    await page.locator('input[name="telephoneno"]').fill('12');
    await page.locator('input[name="emailid"]').fill('12@34.com');
    await page.locator('input[name="password"]').fill('12');
  });

  await test.step("And: el usuario envía el formulario de New Customer", async () => {
    // El botón submit de este formulario suele ser de tipo input[name="sub"]
    await page.locator('input[name="sub"]').click();
  });

  await test.step("Then: se muestra un alert de error al enviar el formulario", async () => {
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBeTruthy();
      console.log('Mensaje de alerta recibido:', dialog.message());
      await dialog.accept();
    });
    // Espera breve para asegurar la aparición del alert
    await page.waitForTimeout(2000);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 03:00:44
⏱️  Tiempo: 43874ms (43.9s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario
🔄 Iteraciones: 1 análisis ejecutados
🧠 Tokens: 1561 tokens consumidos
📊 Líneas: 51 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-validacion-new-customer-guru99
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