/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección 'New Customer' y al hacer clic en el botón con texto 'Home' usando el selector p[align='right'] a:has-text("Home") se redirige a la página inicial tras el login
 */

import { test, expect } from '@playwright/test';

test('login-y-navegacion-home-guru99', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario introduce el User ID en el campo correspondiente", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce el Password en el campo correspondiente", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace clic en el botón LOGIN", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: el usuario accede a la sección 'New Customer'", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
    console.log('Se accedió a la sección New Customer');
  });

  await test.step("And: el usuario hace clic en el enlace Home y es redirigido a la página inicial tras el login", async () => {
    await page.locator('p[align="right"] a:has-text("Home")').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
    console.log('Redirección correcta a la página inicial tras login');
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 22:59:51
⏱️  Tiempo: 49056ms (49.1s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección 'New Customer' y al hacer clic en el botón con texto 'Home' usando el selector p[align='right'] a:has-text("Home") se redirige a la página inicial tras el login
🔄 Iteraciones: 6 análisis seccionales
📊 Líneas: 31 líneas generadas

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
  • Test name: login-y-navegacion-home-guru99

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