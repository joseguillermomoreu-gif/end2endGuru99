/**
 * 🎯 OBJETIVO DEL TEST:
 * Verificar que al acceder a la página Guru99 Bank Home Page el título de la página sea exactamente "Guru99 Bank Home Page"
 */

import { test, expect } from '@playwright/test';

test('verificar-titulo-guru99-bank-home-page', async ({ page }) => {
  await test.step("Then: la página muestra el título correcto en <title>", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Guru99 Bank Home Page');
    console.log('Título verificado:', pageTitle);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:19:11
⏱️  Tiempo: 20773ms (20.8s)
🎯 Objetivo: Verificar que al acceder a la página Guru99 Bank Home Page el título de la página sea exactamente "Guru99 Bank Home Page"
🔄 Iteraciones: 1 análisis ejecutados
🧠 Tokens: 902 tokens consumidos
📊 Líneas: 10 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: verificar-titulo-guru99-bank-home-page

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