/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que la página Guru99 Bank Home Page carga correctamente y es accesible desde la URL proporcionada
 */

import { test, expect } from '@playwright/test';

test('validar-carga-guru99-bank-home-page', async ({ page }) => {
  await test.step("Given: navego a la página Guru99 Bank Home Page", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("Then: la URL debe ser la esperada", async () => {
    await expect(page).toHaveURL('https://demo.guru99.com/V4/');
    console.log('URL actual:', page.url());
  });

  await test.step('Then: el título principal "Guru99 Bank" debe ser visible', async () => {
    const titulo = page.locator('h2.barone:has-text("Guru99 Bank")');
    await expect(titulo).toBeVisible();
    const tituloTexto = await titulo.textContent();
    console.log('Título principal:', tituloTexto);
  });

  await test.step('Then: el formulario de login debe estar presente', async () => {
    const formularioLogin = page.locator('form[name="frmLogin"]');
    await expect(formularioLogin).toBeVisible();
    const formName = await formularioLogin.getAttribute('name');
    console.log('Nombre del formulario:', formName);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 23:12:48
⏱️  Tiempo: 24843ms (24.8s)
🎯 Objetivo: Validar que la página Guru99 Bank Home Page carga correctamente y es accesible desde la URL proporcionada
🔄 Iteraciones: 1 análisis ejecutados
🧠 Tokens: 1116 tokens consumidos
📊 Líneas: 26 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: validar-carga-guru99-bank-home-page
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