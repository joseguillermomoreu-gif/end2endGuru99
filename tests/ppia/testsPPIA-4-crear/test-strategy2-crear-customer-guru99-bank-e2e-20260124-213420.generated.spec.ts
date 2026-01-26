/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne en la página Guru99 Bank Home Page luego acceder a la sección New Customer crear un nuevo customer rellenando el formulario con datos reales incluyendo email random_timestamp@gmail.com textos cortos sin tildes ni acentos pin numérico de 6 dígitos sin seleccionar género y fecha de nacimiento 17/03/1992 y verificar que tras enviar el formulario aparece una tabla con los datos del nuevo customer
 */

import { test, expect } from '@playwright/test';

test('crear-customer-guru99-bank-e2e', async ({ page }) => {
  // Then: navegar a la página de login de Guru99 Bank
  await test.step("Then: navegar a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  // Then: completar el input userId
  await test.step("Then: completar el input userId", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  // Then: completar el input password
  await test.step("Then: completar el input password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  // Then: hacer click en el botón login
  await test.step("Then: hacer click en el botón login", async () => {
    await page.locator('input[name="btnLogin"]').click();
  });

  // Then: acceder a la sección New Customer desde el menú usuario
  await test.step("Then: acceder a la sección New Customer desde el menú usuario", async () => {
    await page.locator('ul.menusubnav > li > a[href="addcustomerpage.php"]').click();
  });

  // Then: rellenar el input nombre del formulario New Customer
  await test.step("Then: rellenar el input nombre del formulario New Customer", async () => {
    await page.locator('input[name="name"]').fill('Juan Perez');
  });

  // Then: rellenar el input fecha nacimiento del formulario New Customer
  await test.step("Then: rellenar el input fecha nacimiento del formulario New Customer", async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  // Then: rellenar el textarea dirección del formulario New Customer
  await test.step("Then: rellenar el textarea dirección del formulario New Customer", async () => {
    await page.locator('textarea[name="addr"]').fill('Calle Falsa 123');
  });

  // Then: rellenar el input ciudad del formulario New Customer
  await test.step("Then: rellenar el input ciudad del formulario New Customer", async () => {
    await page.locator('input[name="city"]').fill('Madrid');
  });

  // Then: rellenar el input estado del formulario New Customer
  await test.step("Then: rellenar el input estado del formulario New Customer", async () => {
    await page.locator('input[name="state"]').fill('Madrid');
  });

  // Then: rellenar el input pin del formulario New Customer
  await test.step("Then: rellenar el input pin del formulario New Customer", async () => {
    await page.locator('input[name="pinno"]').fill('280001');
  });

  // Then: rellenar el input teléfono del formulario New Customer
  await test.step("Then: rellenar el input teléfono del formulario New Customer", async () => {
    await page.locator('input[name="telephoneno"]').fill('600123456');
  });

  // Then: rellenar el input email del formulario New Customer con email random
  const timestamp = Date.now();
  const email = `random_${timestamp}@gmail.com`;
  await test.step("Then: rellenar el input email del formulario New Customer con email random", async () => {
    await page.locator('input[name="emailid"]').fill(email);
  });

  // Then: rellenar el input password del formulario New Customer
  await test.step("Then: rellenar el input password del formulario New Customer", async () => {
    await page.locator('input[name="password"]').fill('Password123');
  });

  // Then: hacer click en el botón submit del formulario New Customer
  await test.step("Then: hacer click en el botón submit del formulario New Customer", async () => {
    await page.locator('input[type="submit"][name="sub"]').click();
  });

  // Then: verificar que aparece la tabla de confirmación del nuevo customer y el mensaje de éxito
  await test.step("Then: verificar que aparece la tabla de confirmación del nuevo customer y el mensaje de éxito", async () => {
    const tablaConfirmacion = page.locator('table#customer');
    await expect(tablaConfirmacion).toBeVisible();
    const mensajeExito = tablaConfirmacion.locator('tr > td:has-text("Customer Registered Successfully!!!")');
    await expect(mensajeExito).toBeVisible();
    const textoMensaje = await mensajeExito.textContent();
    console.log('Mensaje de éxito:', textoMensaje);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 2: ANÁLISIS CON PREGUNTAS BINARIAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 21:34:20
⏱️  Tiempo: 303767ms (303.8s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne en la página Guru99 Bank Home Page luego acceder a la sección New Customer crear un nuevo customer rellenando el formulario con datos reales incluyendo email random_timestamp@gmail.com textos cortos sin tildes ni acentos pin numérico de 6 dígitos sin seleccionar género y fecha de nacimiento 17/03/1992 y verificar que tras enviar el formulario aparece una tabla con los datos del nuevo customer
🔄 Iteraciones: 15 análisis ejecutados
🧠 Tokens: 4778 tokens consumidos
📊 Líneas: 90 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: crear-customer-guru99-bank-e2e
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