// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-validacion-new-customer-campos-invalidos', async ({ page }) => {
  // Given: El usuario navega a la página de login
  await test.step("Given: el usuario navega a la página de login", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
  });

  // When: El usuario introduce UserID inválido y Password inválido
  await test.step("When: el usuario introduce UserID y Password válidos", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
    await page.locator('input[name="password"]').fill('UhEpYne');
    await page.locator('input[name="btnLogin"]').click();
  });

  // Then: El usuario ve el menú principal y accede a New Customer
  await test.step("Then: el usuario accede a la sección New Customer", async () => {
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  // When: El usuario rellena el formulario New Customer con datos inválidos
  await test.step("When: el usuario rellena el formulario New Customer con datos inválidos", async () => {
    await page.locator('input[name="name"]').fill('!@#$$%^^&*()_+');
    await page.locator('textarea[name="addr"]').fill('$$$ Calle Falsa 123 ###');
    await page.locator('input[name="city"]').fill('1234!@#');
    await page.locator('input[name="state"]').fill('$$$');
    await page.locator('input[name="pinno"]').fill('abcde!'); // PIN no numérico
    await page.locator('input[name="telephoneno"]').fill('phone!@#'); // Teléfono no numérico
    await page.locator('input[name="emailid"]').fill('correo_invalido@@@');
    await page.locator('input[name="password"]').fill('***1234%%%');
  });

  // Then: El usuario intenta enviar el formulario y espera un alert
  let alertMessage = '';
  await test.step("Then: el usuario hace submit y aparece un alert", async () => {
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    await page.locator('input[type="submit"]').click();
    await page.waitForTimeout(1000);
    expect(alertMessage.length).toBeGreaterThan(0);
    console.log('Mensaje de alerta capturado:', alertMessage);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 01:40:45
⏱️  Tiempo: 295238ms (295.2s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo
🔄 Iteraciones: 15 análisis ejecutados
🧠 Tokens: 3621 tokens consumidos
📊 Líneas: 49 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-validacion-new-customer-campos-invalidos

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