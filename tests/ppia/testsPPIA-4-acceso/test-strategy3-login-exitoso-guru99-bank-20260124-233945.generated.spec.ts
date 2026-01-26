/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente en la página Guru99 Bank Home Page usando User ID=mngr652417 y Password=UhEpYne y que tras el login se muestra una confirmación visible del inicio de sesión exitoso
 */

import { test, expect } from '@playwright/test';

test('login-exitoso-guru99-bank', async ({ page }) => {

  await test.step("Given: el usuario navega a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario introduce el UserID en el campo correspondiente", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce la Password en el campo correspondiente", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón LOGIN", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: se muestra el mensaje de bienvenida", async () => {
    const mensajeBienvenida = page.locator('marquee.heading3:has-text("Welcome To Manager\'s Page of Guru99 Bank")');
    await expect(mensajeBienvenida).toBeVisible();
    const textoBienvenida = await mensajeBienvenida.textContent();
    console.log('Mensaje de bienvenida:', textoBienvenida);
  });

  await test.step("And: el enlace Log out está visible en el menú de navegación", async () => {
    const enlaceLogout = page.locator('.menusubnav a:has-text("Log out")');
    await expect(enlaceLogout).toBeVisible();
    const textoLogout = await enlaceLogout.textContent();
    console.log('Enlace Log out:', textoLogout);
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:39:45
⏱️  Tiempo: 42004ms (42.0s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente en la página Guru99 Bank Home Page usando User ID=mngr652417 y Password=UhEpYne y que tras el login se muestra una confirmación visible del inicio de sesión exitoso
🔄 Iteraciones: 4 análisis seccionales
📊 Líneas: 42 líneas generadas

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
  • Test name: login-exitoso-guru99-bank

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