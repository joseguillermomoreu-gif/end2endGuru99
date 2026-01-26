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

  await test.step("Then: el usuario navega a la sección New Customer", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('p[align="right"] a:has-text("Home")')).toBeVisible();
  });

  await test.step("And: el usuario hace click en el botón Home", async () => {
    await page.locator('p[align="right"] a:has-text("Home")').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
    await expect(page.locator('.barone:has-text("Guru99 Bank")')).toBeVisible();
    await expect(page.locator('marquee:has-text("Welcome To Manager\'s Page of Guru99 Bank")')).toBeVisible();
    const mensajeBienvenida = await page.locator('marquee:has-text("Welcome To Manager\'s Page of Guru99 Bank")').innerText();
    console.log('Mensaje de bienvenida:', mensajeBienvenida);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 22:59:00
⏱️  Tiempo: 123824ms (123.8s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección 'New Customer' y al hacer clic en el botón con texto 'Home' usando el selector p[align='right'] a:has-text("Home") se redirige a la página inicial tras el login
🔄 Iteraciones: 6 análisis ejecutados
🧠 Tokens: 2207 tokens consumidos
📊 Líneas: 39 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-navegacion-home-guru99
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