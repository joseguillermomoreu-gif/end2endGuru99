/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente en la página Guru99 Bank Home Page usando User ID=mngr652417 y Password=UhEpYne y que tras el login se muestra una confirmación visible del inicio de sesión exitoso
 */

import { test, expect } from '@playwright/test';

test('login-exitoso-guru99-bank', async ({ page }) => {
  // Given: El usuario navega a la página de login de Guru99 Bank
  await test.step("Given: El usuario navega a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
  });

  // When: El usuario introduce el UserID
  await test.step("When: El usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  // And: El usuario introduce el Password
  await test.step("And: El usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  // And: El usuario hace click en el botón Login
  await test.step("And: El usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  // Then: El dashboard y el mensaje de bienvenida son visibles tras login
  await test.step("Then: El dashboard y el mensaje de bienvenida son visibles tras login", async () => {
    await expect(page.locator('.menusubnav')).toBeVisible();
    await expect(page.locator('marquee.heading3')).toBeVisible();
    const managerId = page.locator('tr.heading3:has-text("Manger Id : mngr652417")');
    await expect(managerId).toBeVisible();
    const text = await managerId.textContent();
    console.log('Texto de confirmación login:', text);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:39:02
⏱️  Tiempo: 79556ms (79.6s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente en la página Guru99 Bank Home Page usando User ID=mngr652417 y Password=UhEpYne y que tras el login se muestra una confirmación visible del inicio de sesión exitoso
🔄 Iteraciones: 4 análisis ejecutados
🧠 Tokens: 1704 tokens consumidos
📊 Líneas: 36 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-exitoso-guru99-bank
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