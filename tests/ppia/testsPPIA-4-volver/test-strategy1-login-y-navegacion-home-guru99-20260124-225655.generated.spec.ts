/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección 'New Customer' y al hacer clic en el botón con texto 'Home' usando el selector p[align='right'] a:has-text("Home") se redirige a la página inicial tras el login
 */

import { test, expect } from '@playwright/test';

test('login-y-navegacion-home-guru99', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
  });

  await test.step("When: el usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
    await expect(page.locator('input[name="uid"]')).toHaveValue('mngr652417');
  });

  await test.step("And: el usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
    await expect(page.locator('input[name="password"]')).toHaveValue('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
  });

  await test.step("And: el usuario accede a la sección 'New Customer'", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('p[align="right"] a:has-text("Home")')).toBeVisible();
  });

  await test.step("Then: el usuario hace click en el enlace Home y es redirigido a la página inicial tras el login", async () => {
    await page.locator('p[align="right"] a:has-text("Home")').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
    const isHomeVisible = await page.locator('.menusubnav a:has-text("New Customer")').isVisible();
    console.log('¿Se muestra el menú "New Customer" tras volver a Home?', isHomeVisible);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 22:56:55
⏱️  Tiempo: 125476ms (125.5s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección 'New Customer' y al hacer clic en el botón con texto 'Home' usando el selector p[align='right'] a:has-text("Home") se redirige a la página inicial tras el login
🔄 Iteraciones: 6 análisis ejecutados
🧠 Tokens: 2090 tokens consumidos
📊 Líneas: 37 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-navegacion-home-guru99

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