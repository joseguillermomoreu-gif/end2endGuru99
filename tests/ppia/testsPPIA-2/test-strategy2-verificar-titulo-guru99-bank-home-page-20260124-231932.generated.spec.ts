/**
 * 🎯 OBJETIVO DEL TEST:
 * Verificar que al acceder a la página Guru99 Bank Home Page el título de la página sea exactamente "Guru99 Bank Home Page"
 */

import { test, expect } from '@playwright/test';

test('verificar-titulo-guru99-bank-home-page', async ({ page }) => {
  await test.step("Given: navego a la página principal de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("Then: el encabezado principal Guru99 Bank es visible", async () => {
    const encabezado = page.locator('h2.barone:has-text("Guru99 Bank")');
    await expect(encabezado).toBeVisible();
  });

  await test.step('Then: el título HTML de la página es exactamente "Guru99 Bank Home Page"', async () => {
    const titulo = await page.title();
    expect(titulo).toBe("Guru99 Bank Home Page");
    console.log('Título obtenido:', titulo);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:19:32
⏱️  Tiempo: 21427ms (21.4s)
🎯 Objetivo: Verificar que al acceder a la página Guru99 Bank Home Page el título de la página sea exactamente "Guru99 Bank Home Page"
🔄 Iteraciones: 1 análisis ejecutados
🧠 Tokens: 1032 tokens consumidos
📊 Líneas: 18 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: verificar-titulo-guru99-bank-home-page
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