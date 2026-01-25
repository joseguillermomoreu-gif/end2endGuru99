/**
 * 🎯 OBJETIVO DEL TEST:
 * Verificar que al hacer clic en el botón reset del formulario de login se limpian los campos de usuario y contraseña correctamente
 */

import { test, expect } from '@playwright/test';

test('verificar-funcion-reset-login-guru99', async ({ page }) => {
  // Given: Navegar a la página de login de Guru99
  await test.step("Given: Navegar a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  // When: Rellenar el input de usuario
  await test.step("When: Rellenar el input de usuario", async () => {
    await page.locator('input[name="uid"]').fill('testuser');
  });

  // And: Rellenar el input de contraseña
  await test.step("And: Rellenar el input de contraseña", async () => {
    await page.locator('input[name="password"]').fill('testpassword');
  });

  // And: Hacer clic en el botón reset
  await test.step("And: Hacer clic en el botón reset", async () => {
    await page.locator('input[name="btnReset"]').click();
  });

  // Then: Verificar que el input de usuario está vacío
  await test.step("Then: Verificar que el input de usuario está vacío", async () => {
    const userValue = await page.locator('input[name="uid"]').inputValue();
    expect(userValue).toBe('');
    console.log('Valor del input usuario tras reset:', userValue);
  });

  // And: Verificar que el input de contraseña está vacío
  await test.step("And: Verificar que el input de contraseña está vacío", async () => {
    const passValue = await page.locator('input[name="password"]').inputValue();
    expect(passValue).toBe('');
    console.log('Valor del input contraseña tras reset:', passValue);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:31:42
⏱️  Tiempo: 82696ms (82.7s)
🎯 Objetivo: Verificar que al hacer clic en el botón reset del formulario de login se limpian los campos de usuario y contraseña correctamente
🔄 Iteraciones: 4 análisis ejecutados
🧠 Tokens: 1757 tokens consumidos
📊 Líneas: 37 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: verificar-funcion-reset-login-guru99
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