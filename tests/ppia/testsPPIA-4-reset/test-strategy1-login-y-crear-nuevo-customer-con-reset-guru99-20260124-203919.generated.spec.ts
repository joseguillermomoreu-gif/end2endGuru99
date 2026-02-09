// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente en Guru99 Bank Home Page usando User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer rellenar el formulario con datos válidos incluyendo email ejemplo@gmail.com sin tildes o caracteres especiales textos cortos pin numérico de 6 dígitos género female y fecha de nacimiento 17/03/1992 y finalmente comprobar que el botón de reset limpia todos los campos del formulario
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-crear-nuevo-customer-con-reset-guru99', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
    await expect(page.locator('input[name="btnReset"]')).toBeVisible();
  });

  await test.step("When: el usuario introduce UserID y Password válidos", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
    await expect(page.locator('.menusubnav')).toBeVisible();
  });

  await test.step('And: el usuario navega a la sección New Customer', async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="rad1"][value="f"]')).toBeVisible();
    await expect(page.locator('input[name="dob"]')).toBeVisible();
    await expect(page.locator('textarea[name="addr"]')).toBeVisible();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await expect(page.locator('input[name="state"]')).toBeVisible();
    await expect(page.locator('input[name="pinno"]')).toBeVisible();
    await expect(page.locator('input[name="telephoneno"]')).toBeVisible();
    await expect(page.locator('input[name="emailid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="sub"]')).toBeVisible();
    await expect(page.locator('input[name="res"]')).toBeVisible();
  });

  await test.step('And: el usuario rellena el campo Customer Name', async () => {
    await page.locator('input[name="name"]').fill('Maria');
  });

  await test.step('And: el usuario selecciona el género female', async () => {
    await page.locator('input[name="rad1"][value="f"]').click();
  });

  await test.step('And: el usuario introduce la fecha de nacimiento', async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  await test.step('And: el usuario rellena el campo Address', async () => {
    await page.locator('textarea[name="addr"]').fill('Calle 123');
  });

  await test.step('And: el usuario rellena el campo City', async () => {
    await page.locator('input[name="city"]').fill('Madrid');
  });

  await test.step('And: el usuario rellena el campo State', async () => {
    await page.locator('input[name="state"]').fill('Madrid');
  });

  await test.step('And: el usuario rellena el campo PIN', async () => {
    await page.locator('input[name="pinno"]').fill('280001');
  });

  await test.step('And: el usuario rellena el campo Mobile Number', async () => {
    await page.locator('input[name="telephoneno"]').fill('600123456');
  });

  await test.step('And: el usuario rellena el campo Email', async () => {
    await page.locator('input[name="emailid"]').fill('ejemplo@gmail.com');
  });

  await test.step('And: el usuario rellena el campo Password del formulario New Customer', async () => {
    await page.locator('input[name="password"]').fill('pass1234');
  });

  await test.step('Then: el usuario hace click en el botón Reset y valida que los campos quedan vacíos', async () => {
    await page.locator('input[name="res"]').click();
    const nameValue = await page.locator('input[name="name"]').inputValue();
    const genderChecked = await page.locator('input[name="rad1"][value="f"]').isChecked();
    const dobValue = await page.locator('input[name="dob"]').inputValue();
    const addrValue = await page.locator('textarea[name="addr"]').inputValue();
    const cityValue = await page.locator('input[name="city"]').inputValue();
    const stateValue = await page.locator('input[name="state"]').inputValue();
    const pinValue = await page.locator('input[name="pinno"]').inputValue();
    const mobileValue = await page.locator('input[name="telephoneno"]').inputValue();
    const emailValue = await page.locator('input[name="emailid"]').inputValue();
    const passwordValue = await page.locator('input[name="password"]').inputValue();

    await expect(nameValue).toBe('');
    await expect(genderChecked).toBeFalsy();
    await expect(dobValue).toBe('');
    await expect(addrValue).toBe('');
    await expect(cityValue).toBe('');
    await expect(stateValue).toBe('');
    await expect(pinValue).toBe('');
    await expect(mobileValue).toBe('');
    await expect(emailValue).toBe('');
    await expect(passwordValue).toBe('');

    console.log({
      nameValue,
      genderChecked,
      dobValue,
      addrValue,
      cityValue,
      stateValue,
      pinValue,
      mobileValue,
      emailValue,
      passwordValue
    });
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 20:39:19
⏱️  Tiempo: 317745ms (317.7s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente en Guru99 Bank Home Page usando User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer rellenar el formulario con datos válidos incluyendo email ejemplo@gmail.com sin tildes o caracteres especiales textos cortos pin numérico de 6 dígitos género female y fecha de nacimiento 17/03/1992 y finalmente comprobar que el botón de reset limpia todos los campos del formulario
🔄 Iteraciones: 16 análisis ejecutados
🧠 Tokens: 4867 tokens consumidos
📊 Líneas: 115 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-crear-nuevo-customer-con-reset-guru99

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