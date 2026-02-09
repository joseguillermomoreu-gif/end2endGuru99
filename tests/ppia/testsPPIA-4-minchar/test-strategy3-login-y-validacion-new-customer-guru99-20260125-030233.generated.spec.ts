// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-validacion-new-customer-guru99', async ({ page }) => {
  await test.step("Given: El usuario navega a la página de login de Guru99", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
  });

  await test.step("When: El usuario introduce el User ID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: El usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: El usuario hace click en el botón LOGIN", async () => {
    await page.locator('input[name="btnLogin"]').click();
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
  });

  await test.step("And: El usuario navega a la sección New Customer", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  await test.step("And: El usuario rellena el campo Customer Name con dos dígitos", async () => {
    await page.locator('input[name="name"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo Date of Birth con 17/03/1992", async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  await test.step("And: El usuario rellena el campo Address con dos dígitos", async () => {
    await page.locator('textarea[name="addr"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo City con dos dígitos", async () => {
    await page.locator('input[name="city"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo State con dos dígitos", async () => {
    await page.locator('input[name="state"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo PIN con dos dígitos", async () => {
    await page.locator('input[name="pinno"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo Mobile Number con dos dígitos", async () => {
    await page.locator('input[name="telephoneno"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo Email con dos dígitos", async () => {
    await page.locator('input[name="emailid"]').fill('12');
  });

  await test.step("And: El usuario rellena el campo Password con dos dígitos", async () => {
    await page.locator('input[name="password"]').fill('12');
  });

  await test.step("When: El usuario hace click en el botón Submit para crear el cliente", async () => {
    page.once('dialog', async dialog => {
      const alertMessage = dialog.message();
      await dialog.accept();
      await test.step("Then: Se valida que aparece un alert de error", async () => {
        expect(alertMessage.length).toBeGreaterThan(0);
        console.log('Alert message:', alertMessage);
      });
    });
    await page.locator('input[type="submit"][name="sub"]').click();
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 03:02:33
⏱️  Tiempo: 108393ms (108.4s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer intentar crear un cliente ingresando solo dos caracteres numéricos en los campos requeridos ignorando el campo de género y usando la fecha 17 de marzo de 1992 y verificar que aparece un alert de error al enviar el formulario
🔄 Iteraciones: 15 análisis seccionales
📊 Líneas: 74 líneas generadas

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
  • Test name: login-y-validacion-new-customer-guru99

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