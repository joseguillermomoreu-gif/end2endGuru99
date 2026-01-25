/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y comprobar que no es posible crear un nuevo cliente sin completar los campos requeridos
 */

import { test, expect } from '@playwright/test';

test('login-y-validacion-new-customer-obligatorios', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario introduce el User ID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón LOGIN", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step('Then: el usuario accede a la sección "New Customer"', async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  await test.step('And: el usuario intenta crear un nuevo cliente sin rellenar los campos obligatorios', async () => {
    await page.locator('input[type="submit"]').click();
  });

  await test.step('Then: se validan los mensajes de error o el rechazo por campos vacíos', async () => {
    // Se espera que la página no avance y permanezca en el formulario de "New Customer"
    const stillOnForm = await page.locator('input[name="name"]').isVisible();
    expect(stillOnForm).toBeTruthy();
    console.log('¿El formulario de New Customer sigue visible tras submit vacío?:', stillOnForm);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 00:28:04
⏱️  Tiempo: 51701ms (51.7s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y comprobar que no es posible crear un nuevo cliente sin completar los campos requeridos
🔄 Iteraciones: 6 análisis seccionales
📊 Líneas: 34 líneas generadas

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
  • Test name: login-y-validacion-new-customer-obligatorios

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