/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo
 */

import { test, expect } from '@playwright/test';

test('login-y-validacion-new-customer-campos-invalidos', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[type="submit"][value="LOGIN"]')).toBeVisible();
  });

  await test.step("When: el usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón LOGIN", async () => {
    await page.locator('input[type="submit"][value="LOGIN"]').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
  });

  await test.step("And: el usuario navega a la sección 'New Customer'", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('textarea[name="addr"]')).toBeVisible();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await expect(page.locator('input[name="state"]')).toBeVisible();
    await expect(page.locator('input[name="pinno"]')).toBeVisible();
    await expect(page.locator('input[name="telephoneno"]')).toBeVisible();
    await expect(page.locator('input[name="emailid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[type="submit"][value="Submit"]')).toBeVisible();
  });

  await test.step("And: el usuario rellena el campo Customer Name con caracteres especiales", async () => {
    await page.locator('input[name="name"]').fill('@@@###$$$');
  });

  await test.step("And: el usuario rellena el campo Address con caracteres especiales", async () => {
    await page.locator('textarea[name="addr"]').fill('!@#%&*()_+');
  });

  await test.step("And: el usuario rellena el campo City con caracteres inválidos", async () => {
    await page.locator('input[name="city"]').fill('1234!@');
  });

  await test.step("And: el usuario rellena el campo State con caracteres inválidos", async () => {
    await page.locator('input[name="state"]').fill('***STATE***');
  });

  await test.step("And: el usuario rellena el campo PIN con letras y símbolos", async () => {
    await page.locator('input[name="pinno"]').fill('12ab!@');
  });

  await test.step("And: el usuario rellena el campo Mobile Number con letras y símbolos", async () => {
    await page.locator('input[name="telephoneno"]').fill('phone!@#');
  });

  await test.step("And: el usuario rellena el campo E-mail con un email inválido", async () => {
    await page.locator('input[name="emailid"]').fill('correo@@@.com');
  });

  await test.step("And: el usuario rellena el campo Password con caracteres especiales", async () => {
    await page.locator('input[name="password"]').fill('***1234$$$');
  });

  await test.step("When: el usuario hace click en el botón Submit", async () => {
    page.once('dialog', async dialog => {
      await expect(dialog.message()).not.toBe('');
      console.log('Mensaje de alerta mostrado:', dialog.message());
      await dialog.accept();
    });
    await page.locator('input[type="submit"][value="Submit"]').click();
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 01:47:12
⏱️  Tiempo: 94188ms (94.2s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo
🔄 Iteraciones: 14 análisis seccionales
📊 Líneas: 77 líneas generadas

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
  • Test name: login-y-validacion-new-customer-campos-invalidos

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