/**
 * 🎯 OBJETIVO DEL TEST:
 * Verificar que al hacer clic en el botón reset del formulario de login se limpian los campos de usuario y contraseña correctamente
 */

import { test, expect } from '@playwright/test';

test('verificar-funcion-reset-login-guru99', async ({ page }) => {

  await test.step("Given: el usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario rellena el campo usuario", async () => {
    await page.locator('input[name="uid"]').fill('usuarioDemo');
  });

  await test.step("And: el usuario rellena el campo contraseña", async () => {
    await page.locator('input[name="password"]').fill('contraseñaDemo');
  });

  await test.step("And: el usuario hace clic en el botón reset", async () => {
    await page.locator('input[name="btnReset"]').click();
  });

  await test.step("Then: los campos usuario y contraseña están vacíos tras el reset", async () => {
    const valorUsuario = await page.locator('input[name="uid"]').inputValue();
    const valorPassword = await page.locator('input[name="password"]').inputValue();
    expect(valorUsuario).toBe('');
    expect(valorPassword).toBe('');
    console.log('Valor campo usuario tras reset:', valorUsuario, '| Valor campo contraseña tras reset:', valorPassword);
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:32:22
⏱️  Tiempo: 39394ms (39.4s)
🎯 Objetivo: Verificar que al hacer clic en el botón reset del formulario de login se limpian los campos de usuario y contraseña correctamente
🔄 Iteraciones: 4 análisis seccionales
📊 Líneas: 29 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Secciones analizadas: 5
      1. "header"
      2. "main"
      3. "footer"
      4. "nav"
      5. "body"
  • Selector específico: ninguno
  • Test name: verificar-funcion-reset-login-guru99

────────────────────────────────────────────────────────────────

💡 CUÁNDO USAR ESTA ESTRATEGIA
  ✓ Conoces las secciones principales de la página
  ✓ Quieres analizar múltiples áreas específicas
  ✓ Necesitas optimizar consumo de tokens por secciones
  ✓ Ideal para páginas con estructura clara definida
  ✓ Perfecto para análisis progresivo excluyente

────────────────────────────────────────────────────────────────

⚠️  CARACTERÍSTICAS
  • Autonomía: 70% ia + 30% configuración seccional
  • Coste: Moderado-Alto - Análisis iterativo de múltiples secciones
  • Output: Código Playwright puro y legible
  • Mantenibilidad: El código generado es editable
  • Extracción: Progresiva excluyente (sin límite de caracteres)
  • Selectores: SIEMPRE ['header', 'main', 'footer', 'nav', 'body'] + específico opcional

────────────────────────────────────────────────────────────────

📝 PROCESO DE GENERACIÓN
  1. Construcción de selectores (específico + defaults)
  2. Extracción HTML progresiva excluyente por secciones
  3. Análisis iterativo de HTML seccional (hasta 5 iteraciones)
  4. Identificación de selectores únicos por sección
  5. Generación de código Playwright optimizado
  6. Template enriquecido con metadata de secciones

🔍 LÓGICA PROGRESIVA EXCLUYENTE:
  • Sección 1: [selector_específico] → Contenido completo
  • Sección 2: [header] → SIN contenido de sección 1
  • Sección 3: [main] → SIN contenido de secciones 1+2
  • Sección 4: [footer] → SIN contenido de secciones 1+2+3
  • Sección 5: [nav] → SIN contenido de secciones anteriores
  • Sección 6: [body] → SIN contenido de todas las anteriores

════════════════════════════════════════════════════════════════
 */