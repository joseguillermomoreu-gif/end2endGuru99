// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-validacion-new-customer-campos-invalidos', async ({ page }) => {

  await test.step("Given: el usuario navega a la página de login", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  await test.step("When: el usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón LOGIN", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  await test.step("Then: el menú principal es visible y el usuario navega a New Customer", async () => {
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  await test.step("When: el formulario Add New Customer es visible y se rellenan los campos con datos inválidos", async () => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await page.locator('input[name="name"]').fill('!@#Cliente123'); // caracteres especiales
    await page.locator('textarea[name="addr"]').fill('Calle Falsa 123!@#'); // caracteres especiales
    await page.locator('input[name="city"]').fill('12345'); // numérico inválido para ciudad
    await page.locator('input[name="state"]').fill('$$$'); // caracteres especiales
    await page.locator('input[name="pinno"]').fill('ABCDE!'); // no numérico
    await page.locator('input[name="telephoneno"]').fill('telefono!@#'); // no numérico
    await page.locator('input[name="emailid"]').fill('correo_invalido'); // email sin @
    await page.locator('input[name="password"]').fill('123'); // password corto
  });

  await test.step("And: el usuario hace click en el botón Submit", async () => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      const alertText = dialog.message();
      console.log('Texto del alert capturado:', alertText);
      await dialog.accept();
    });
    await page.locator('input[type="submit"][name="sub"]').click();
  });

});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 01:45:36
⏱️  Tiempo: 289398ms (289.4s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' e intentar crear un nuevo cliente rellenando los campos con caracteres especiales y valores incorrectos ignorando el campo de género y fechas y verificar que aparece un alert al hacer submit erróneo
🔄 Iteraciones: 14 análisis ejecutados
🧠 Tokens: 3875 tokens consumidos
📊 Líneas: 50 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-validacion-new-customer-campos-invalidos
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