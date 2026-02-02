/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne en la página Guru99 Bank Home Page luego acceder a la sección New Customer crear un nuevo customer rellenando el formulario con datos reales incluyendo email random_timestamp@gmail.com textos cortos sin tildes ni acentos pin numérico de 6 dígitos sin seleccionar género y fecha de nacimiento 17/03/1992 y verificar que tras enviar el formulario aparece una tabla con los datos del nuevo customer
 */

import { test, expect } from '@playwright/test';

test('crear-customer-guru99-bank-e2e', async ({ page }) => {
  // Given: El usuario navega a la página de inicio de sesión de Guru99 Bank
  await test.step('Given: El usuario navega a la página de inicio de sesión de Guru99 Bank', async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  // When: El usuario introduce su UserID
  await test.step('When: El usuario introduce su UserID', async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  // And: El usuario introduce su Password
  await test.step('And: El usuario introduce su Password', async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  // And: El usuario hace click en el botón LOGIN
  await test.step('And: El usuario hace click en el botón LOGIN', async () => {
    await page.locator('input[type="submit"][name="btnLogin"]').click();
  });

  // Then: El usuario accede al menú New Customer
  await test.step('Then: El usuario accede al menú New Customer', async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  // When: El usuario rellena el campo Customer Name
  await test.step('When: El usuario rellena el campo Customer Name', async () => {
    await page.locator('input[name="name"]').fill('Juan Perez');
  });

  // And: El usuario rellena el campo Date of Birth
  await test.step('And: El usuario rellena el campo Date of Birth', async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  // And: El usuario rellena el campo Address
  await test.step('And: El usuario rellena el campo Address', async () => {
    await page.locator('textarea[name="addr"]').fill('Calle Falsa 123');
  });

  // And: El usuario rellena el campo City
  await test.step('And: El usuario rellena el campo City', async () => {
    await page.locator('input[name="city"]').fill('Madrid');
  });

  // And: El usuario rellena el campo State
  await test.step('And: El usuario rellena el campo State', async () => {
    await page.locator('input[name="state"]').fill('Madrid');
  });

  // And: El usuario rellena el campo PIN
  await test.step('And: El usuario rellena el campo PIN', async () => {
    await page.locator('input[name="pinno"]').fill('280001');
  });

  // And: El usuario rellena el campo Mobile Number
  await test.step('And: El usuario rellena el campo Mobile Number', async () => {
    await page.locator('input[name="telephoneno"]').fill('600123456');
  });

  // And: El usuario rellena el campo Email con un valor único
  const timestamp = Date.now();
  const email = `random_${timestamp}@gmail.com`;
  await test.step('And: El usuario rellena el campo Email con un valor único', async () => {
    await page.locator('input[name="emailid"]').fill(email);
  });

  // And: El usuario rellena el campo Customer Password
  await test.step('And: El usuario rellena el campo Customer Password', async () => {
    await page.locator('input[name="password"]').fill('password123');
  });

  // And: El usuario hace click en el botón Submit
  await test.step('And: El usuario hace click en el botón Submit', async () => {
    await page.locator('input[type="submit"][value="Submit"]').click();
  });

  // Then: El usuario visualiza la tabla con los datos del nuevo customer y el mensaje de éxito
  await test.step('Then: El usuario visualiza la tabla con los datos del nuevo customer y el mensaje de éxito', async () => {
    const successMsg = page.locator('table#customer td:has-text("Customer Registered Successfully!!!")');
    await expect(successMsg).toBeVisible();
    const table = page.locator('table#customer');
    await expect(table).toBeVisible();
    const tableContent = await table.textContent();
    console.log('Tabla de datos del nuevo customer:', tableContent);
    expect(tableContent).toContain(email);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 21:36:01
⏱️  Tiempo: 99436ms (99.4s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID mngr652417 y Password UhEpYne en la página Guru99 Bank Home Page luego acceder a la sección New Customer crear un nuevo customer rellenando el formulario con datos reales incluyendo email random_timestamp@gmail.com textos cortos sin tildes ni acentos pin numérico de 6 dígitos sin seleccionar género y fecha de nacimiento 17/03/1992 y verificar que tras enviar el formulario aparece una tabla con los datos del nuevo customer
🔄 Iteraciones: 15 análisis seccionales
📊 Líneas: 91 líneas generadas

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
  • Test name: crear-customer-guru99-bank-e2e

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
