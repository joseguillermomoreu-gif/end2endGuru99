/**
 * 🎯 OBJETIVO DEL TEST:
 * Verificar que al hacer clic en el botón reset del formulario de login se limpian los campos de usuario y contraseña correctamente
 */

import { test, expect } from '@playwright/test';

test('verificar-funcion-reset-login-guru99', async ({ page }) => {

  await test.step("Given: el usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
    await expect(page.locator('input[name="btnReset"]')).toBeVisible();
  });

  await test.step("When: el usuario rellena el campo UserID", async () => {
    await page.locator('input[name="uid"]').fill('testuser');
    const userIdValue = await page.locator('input[name="uid"]').inputValue();
    expect(userIdValue).toBe('testuser');
  });

  await test.step("And: el usuario rellena el campo Password", async () => {
    await page.locator('input[name="password"]').fill('testpassword');
    const passwordValue = await page.locator('input[name="password"]').inputValue();
    expect(passwordValue).toBe('testpassword');
  });

  await test.step("And: el usuario hace clic en el botón RESET", async () => {
    await page.locator('input[name="btnReset"]').click();
  });

  await test.step("Then: los campos UserID y Password quedan vacíos tras el reset", async () => {
    const userIdValueAfterReset = await page.locator('input[name="uid"]').inputValue();
    const passwordValueAfterReset = await page.locator('input[name="password"]').inputValue();
    expect(userIdValueAfterReset).toBe('');
    expect(passwordValueAfterReset).toBe('');
    console.log('Valores tras reset:', { userIdValueAfterReset, passwordValueAfterReset });
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:30:19
⏱️  Tiempo: 86506ms (86.5s)
🎯 Objetivo: Verificar que al hacer clic en el botón reset del formulario de login se limpian los campos de usuario y contraseña correctamente
🔄 Iteraciones: 4 análisis ejecutados
🧠 Tokens: 1725 tokens consumidos
📊 Líneas: 37 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: verificar-funcion-reset-login-guru99

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