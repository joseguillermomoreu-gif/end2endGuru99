/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que la página Guru99 Bank Home Page carga correctamente y es accesible desde la URL proporcionada
 */

import { test, expect } from '@playwright/test';

test('validar-carga-guru99-bank-home-page', async ({ page }) => {
  await test.step("Given: navego a la página Guru99 Bank Home Page", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("Then: se visualiza el título principal Guru99 Bank", async () => {
    const titulo = page.locator('h2.barone:has-text("Guru99 Bank")');
    await expect(titulo).toBeVisible();
    const textoTitulo = await titulo.textContent();
    console.log('Título principal encontrado:', textoTitulo);
  });

  await test.step("Then: se visualiza el formulario de login", async () => {
    const formularioLogin = page.locator('form[name="frmLogin"]');
    await expect(formularioLogin).toBeVisible();
    console.log('Formulario login visible:', await formularioLogin.getAttribute('name'));
  });

  await test.step("Then: se visualiza el input UserID", async () => {
    const inputUserID = page.locator('input[name="uid"]');
    await expect(inputUserID).toBeVisible();
    console.log('Input UserID visible:', await inputUserID.getAttribute('name'));
  });

  await test.step("Then: se visualiza el input Password", async () => {
    const inputPassword = page.locator('input[name="password"]');
    await expect(inputPassword).toBeVisible();
    console.log('Input Password visible:', await inputPassword.getAttribute('name'));
  });

  await test.step("Then: se visualiza el botón LOGIN", async () => {
    const botonLogin = page.locator('input[type="submit"][value="LOGIN"]');
    await expect(botonLogin).toBeVisible();
    console.log('Botón LOGIN visible:', await botonLogin.getAttribute('value'));
  });

  await test.step("Then: se visualiza el mensaje de bienvenida", async () => {
    const mensajeBienvenida = page.locator('div.heading3:has-text("Welcome To The Online Banking Page of Guru99 Bank")');
    await expect(mensajeBienvenida).toBeVisible();
    const textoBienvenida = await mensajeBienvenida.textContent();
    console.log('Mensaje de bienvenida:', textoBienvenida);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:13:15
⏱️  Tiempo: 26529ms (26.5s)
🎯 Objetivo: Validar que la página Guru99 Bank Home Page carga correctamente y es accesible desde la URL proporcionada
🔄 Iteraciones: 1 análisis seccionales
📊 Líneas: 45 líneas generadas

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
  • Test name: validar-carga-guru99-bank-home-page

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