/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente en la página Guru99 Bank Home Page usando User ID=mngr652417 y Password=UhEpYne y que tras el login se muestra una confirmación visible del inicio de sesión exitoso
 */

import { test, expect } from '@playwright/test';

test('login-exitoso-guru99-bank', async ({ page }) => {

  await test.step("Given: el usuario navega a la página de login de Guru99 Bank", async () => {
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
  });

  await test.step("Then: se muestra la navegación principal y el mensaje de bienvenida", async () => {
    await expect(page.locator('.menusubnav')).toBeVisible();
    await expect(page.locator('marquee.heading3')).toBeVisible();
    await expect(page.locator('tr.heading3:has-text("Manger Id : mngr652417")')).toBeVisible();
    const managerIdText = await page.locator('tr.heading3:has-text("Manger Id : mngr652417")').innerText();
    console.log('Texto de confirmación tras login:', managerIdText);
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:37:41
⏱️  Tiempo: 80652ms (80.7s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente en la página Guru99 Bank Home Page usando User ID=mngr652417 y Password=UhEpYne y que tras el login se muestra una confirmación visible del inicio de sesión exitoso
🔄 Iteraciones: 4 análisis ejecutados
🧠 Tokens: 1646 tokens consumidos
📊 Líneas: 34 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-exitoso-guru99-bank

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