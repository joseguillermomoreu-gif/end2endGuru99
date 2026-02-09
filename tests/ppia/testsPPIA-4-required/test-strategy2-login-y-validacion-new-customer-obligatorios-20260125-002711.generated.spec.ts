// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y comprobar que no es posible crear un nuevo cliente sin completar los campos requeridos
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-validacion-new-customer-obligatorios', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
  });

  await test.step("When: el usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: el usuario visualiza el menú lateral con enlace a New Customer", async () => {
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
  });

  await test.step("When: el usuario accede a la sección New Customer", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  await test.step("Then: el formulario Add New Customer es visible", async () => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="dob"]')).toBeVisible();
    await expect(page.locator('textarea[name="addr"]')).toBeVisible();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await expect(page.locator('input[name="state"]')).toBeVisible();
    await expect(page.locator('input[name="pinno"]')).toBeVisible();
    await expect(page.locator('input[name="telephoneno"]')).toBeVisible();
    await expect(page.locator('input[name="emailid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[type="submit"][name="sub"]')).toBeVisible();
  });

  await test.step("When: el usuario intenta crear un nuevo cliente enviando el formulario vacío", async () => {
    await page.locator('input[type="submit"][name="sub"]').click();
  });

  await test.step("Then: el formulario sigue visible y no se muestra mensaje de error ni validación", async () => {
    const isFormStillVisible = await page.locator('input[name="name"]').isVisible();
    expect(isFormStillVisible).toBeTruthy();
    console.log('Formulario sigue visible tras submit vacío:', isFormStillVisible);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 00:27:11
⏱️  Tiempo: 163907ms (163.9s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y comprobar que no es posible crear un nuevo cliente sin completar los campos requeridos
🔄 Iteraciones: 8 análisis ejecutados
🧠 Tokens: 2828 tokens consumidos
📊 Líneas: 53 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-validacion-new-customer-obligatorios
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