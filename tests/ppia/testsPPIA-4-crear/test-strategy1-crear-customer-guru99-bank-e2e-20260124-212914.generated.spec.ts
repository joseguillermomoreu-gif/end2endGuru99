// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne en la página Guru99 Bank Home Page luego acceder a la sección New Customer crear un nuevo customer rellenando el formulario con datos reales incluyendo email random_timestamp@gmail.com textos cortos sin tildes ni acentos pin numérico de 6 dígitos sin seleccionar género y fecha de nacimiento 17/03/1992 y verificar que tras enviar el formulario aparece una tabla con los datos del nuevo customer
 */

import { test, expect } from '@playwright/test';

test.skip('crear-customer-guru99-bank-e2e', async ({ page }) => {
  // Given: El usuario navega a la página de login de Guru99 Bank
  await test.step("Given: El usuario navega a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
    await expect(page.locator('input[name="uid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="btnLogin"]')).toBeVisible();
  });

  // When: El usuario introduce el UserID
  await test.step("When: El usuario introduce el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  // And: El usuario introduce el Password
  await test.step("And: El usuario introduce el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  // And: El usuario hace click en el botón Login
  await test.step("And: El usuario hace click en el botón Login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  // Then: El usuario ve el menú principal y el enlace a New Customer
  await test.step("Then: El usuario ve el menú principal y el enlace a New Customer", async () => {
    await expect(page.locator('.menusubnav a:has-text("New Customer")')).toBeVisible();
  });

  // When: El usuario navega a la sección New Customer
  await test.step("When: El usuario navega a la sección New Customer", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  // Then: El usuario ve el formulario de New Customer
  await test.step("Then: El usuario ve el formulario de New Customer", async () => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="dob"]')).toBeVisible();
    await expect(page.locator('textarea[name="addr"]')).toBeVisible();
    await expect(page.locator('input[name="city"]')).toBeVisible();
    await expect(page.locator('input[name="state"]')).toBeVisible();
    await expect(page.locator('input[name="pinno"]')).toBeVisible();
    await expect(page.locator('input[name="telephoneno"]')).toBeVisible();
    await expect(page.locator('input[name="emailid"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[type="submit"]')).toBeVisible();
  });

  // When: El usuario rellena el campo nombre
  await test.step("When: El usuario rellena el campo nombre", async () => {
    await page.locator('input[name="name"]').fill('Juan Perez');
  });

  // And: El usuario rellena el campo fecha de nacimiento
  await test.step("And: El usuario rellena el campo fecha de nacimiento", async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  // And: El usuario rellena el campo dirección
  await test.step("And: El usuario rellena el campo dirección", async () => {
    await page.locator('textarea[name="addr"]').fill('Calle Falsa 123');
  });

  // And: El usuario rellena el campo ciudad
  await test.step("And: El usuario rellena el campo ciudad", async () => {
    await page.locator('input[name="city"]').fill('Madrid');
  });

  // And: El usuario rellena el campo estado
  await test.step("And: El usuario rellena el campo estado", async () => {
    await page.locator('input[name="state"]').fill('Madrid');
  });

  // And: El usuario rellena el campo PIN
  await test.step("And: El usuario rellena el campo PIN", async () => {
    await page.locator('input[name="pinno"]').fill('280001');
  });

  // And: El usuario rellena el campo teléfono
  await test.step("And: El usuario rellena el campo teléfono", async () => {
    await page.locator('input[name="telephoneno"]').fill('600123456');
  });

  // And: El usuario rellena el campo email con un email aleatorio
  const timestamp = Date.now();
  const email = `random_${timestamp}@gmail.com`;
  await test.step("And: El usuario rellena el campo email con un email aleatorio", async () => {
    await page.locator('input[name="emailid"]').fill(email);
  });

  // And: El usuario rellena el campo password
  await test.step("And: El usuario rellena el campo password", async () => {
    await page.locator('input[name="password"]').fill('password123');
  });

  // When: El usuario envía el formulario
  await test.step("When: El usuario envía el formulario", async () => {
    await page.locator('input[type="submit"]').click();
  });

  // Then: El usuario ve la tabla de confirmación de registro con los datos del nuevo customer
  await test.step("Then: El usuario ve la tabla de confirmación de registro con los datos del nuevo customer", async () => {
    const table = page.locator('table#customer');
    await expect(table).toBeVisible();
    const tableText = await table.textContent();
    expect(tableText).toContain('Juan Perez');
    expect(tableText).toContain('Calle Falsa 123');
    expect(tableText).toContain('Madrid');
    expect(tableText).toContain('280001');
    expect(tableText).toContain('600123456');
    expect(tableText).toContain(email);
    console.log('Tabla de confirmación contiene:', tableText);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 21:29:14
⏱️  Tiempo: 298909ms (298.9s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne en la página Guru99 Bank Home Page luego acceder a la sección New Customer crear un nuevo customer rellenando el formulario con datos reales incluyendo email random_timestamp@gmail.com textos cortos sin tildes ni acentos pin numérico de 6 dígitos sin seleccionar género y fecha de nacimiento 17/03/1992 y verificar que tras enviar el formulario aparece una tabla con los datos del nuevo customer
🔄 Iteraciones: 15 análisis ejecutados
🧠 Tokens: 5148 tokens consumidos
📊 Líneas: 116 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: crear-customer-guru99-bank-e2e

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