/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que la página Guru99 Bank Home Page carga correctamente y es accesible desde la URL proporcionada
 */

import { test, expect } from '@playwright/test';

test('validar-carga-guru99-bank-home-page', async ({ page }) => {

  await test.step("Given: navego a la página Guru99 Bank Home Page", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("Then: el logo principal Guru99 Demo Sites es visible", async () => {
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    console.log('Logo visible:', await logo.isVisible());
  });

  await test.step("Then: el nombre del sitio Demo Site es visible", async () => {
    const siteName = page.locator('.site-name:has-text("Demo Site")');
    await expect(siteName).toBeVisible();
    console.log('Nombre del sitio visible:', await siteName.isVisible());
  });

  await test.step("Then: el navbar principal está presente", async () => {
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    console.log('Navbar visible:', await navbar.isVisible());
  });

  await test.step("Then: el titular principal Guru99 Bank es visible", async () => {
    const titular = page.locator('h2.barone:has-text("Guru99 Bank")');
    await expect(titular).toBeVisible();
    console.log('Titular principal visible:', await titular.isVisible());
  });

  await test.step("Then: el formulario de login está presente", async () => {
    const loginForm = page.locator('form[name="frmLogin"]');
    await expect(loginForm).toBeVisible();
    console.log('Formulario login visible:', await loginForm.isVisible());
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:12:23
⏱️  Tiempo: 26414ms (26.4s)
🎯 Objetivo: Validar que la página Guru99 Bank Home Page carga correctamente y es accesible desde la URL proporcionada
🔄 Iteraciones: 1 análisis ejecutados
🧠 Tokens: 1314 tokens consumidos
📊 Líneas: 39 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: validar-carga-guru99-bank-home-page

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