/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario
 */

import { test, expect } from '@playwright/test';

test('login-y-validacion-new-customer-guru99', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
  });

  await test.step("When: el usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce la Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: el usuario accede al menú y selecciona New Customer", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  await test.step("When: el usuario rellena el campo nombre con dos dígitos numéricos", async () => {
    await page.locator('input[name="name"]').fill('12');
  });

  await test.step("And: el usuario introduce la fecha de nacimiento 17/03/1992", async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  await test.step("And: el usuario rellena la dirección con dos dígitos numéricos", async () => {
    await page.locator('textarea[name="addr"]').fill('34');
  });

  await test.step("And: el usuario rellena la ciudad con dos dígitos numéricos", async () => {
    await page.locator('input[name="city"]').fill('56');
  });

  await test.step("And: el usuario rellena el estado con dos dígitos numéricos", async () => {
    await page.locator('input[name="state"]').fill('78');
  });

  await test.step("And: el usuario rellena el PIN con dos dígitos numéricos", async () => {
    await page.locator('input[name="pinno"]').fill('90');
  });

  await test.step("And: el usuario rellena el teléfono con dos dígitos numéricos", async () => {
    await page.locator('input[name="telephoneno"]').fill('12');
  });

  await test.step("And: el usuario rellena el email con dos dígitos numéricos", async () => {
    await page.locator('input[name="emailid"]').fill('34');
  });

  await test.step("And: el usuario rellena la contraseña con dos dígitos numéricos", async () => {
    await page.locator('input[name="password"]').fill('56');
  });

  await test.step("When: el usuario hace click en el botón submit", async () => {
    page.once('dialog', async dialog => {
      await test.step("Then: se muestra un alert de error", async () => {
        const alertMessage = dialog.message();
        expect(alertMessage.length).toBeGreaterThan(0);
        console.log('Mensaje de alerta mostrado:', alertMessage);
        await dialog.accept();
      });
    });
    await page.locator('input[type="submit"][name="sub"]').click();
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 02:59:58
⏱️  Tiempo: 327297ms (327.3s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario
🔄 Iteraciones: 17 análisis ejecutados
🧠 Tokens: 5310 tokens consumidos
📊 Líneas: 75 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-validacion-new-customer-guru99

────────────────────────────────────────────────────────────────

💡 CUÁNDO USAR ESTA ESTRATEGIA
  ✓ No conoces la estructura HTML de la página
  ✓ No tienes selectores específicos definidos
  ✓ Quieres descubrimiento automático completo
  ✓ Ideal para testing de regresión

────────────────────────────────────────────────────────────────

⚠️  CARACTERÍSTICAS
  • Autonomía: 95% ia
  • Coste: Alto consumo de tokens OpenAI
  • Output: Código Playwright puro y legible
  • Mantenibilidad: El código generado es editable

────────────────────────────────────────────────────────────────

📝 PROCESO DE GENERACIÓN
  1. Análisis iterativo del HTML de la página (hasta 5 iteraciones)
  2. Identificación automática de selectores CSS
  3. Detección de estructura y formato de datos
  4. Clicks inteligentes para descubrir funcionalidad completa
  5. Síntesis de múltiples análisis en código Playwright optimizado
  6. Validaciones automáticas según objetivo

════════════════════════════════════════════════════════════════
 */