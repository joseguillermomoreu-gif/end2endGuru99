/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente en Guru99 Bank Home Page usando User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer rellenar el formulario con datos válidos incluyendo email ejemplo@gmail.com sin tildes o caracteres especiales textos cortos pin numérico de 6 dígitos género female y fecha de nacimiento 17/03/1992 y finalmente comprobar que el botón de reset limpia todos los campos del formulario
 */

import { test, expect } from '@playwright/test';

test('login-y-crear-nuevo-customer-con-reset-guru99', async ({ page }) => {
  await test.step("Given: el usuario navega a la página de login de Guru99 Bank", async () => {
    await page.goto('https://demo.guru99.com/V4/');
  });

  await test.step("When: el usuario rellena el UserID", async () => {
    await page.locator('input[name="uid"]').fill('mngr652417');
  });

  await test.step("And: el usuario rellena el Password", async () => {
    await page.locator('input[name="password"]').fill('UhEpYne');
  });

  await test.step("And: el usuario hace click en el botón LOGIN", async () => {
    await page.locator('input[type="submit"][name="btnLogin"]').click();
  });

  await test.step("Then: el usuario navega al menú New Customer", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  await test.step("When: el usuario rellena el campo Customer Name", async () => {
    await page.locator('input[name="name"]').fill('Maria');
  });

  await test.step("And: el usuario selecciona el género female", async () => {
    await page.locator('input[name="rad1"][value="f"]').click();
  });

  await test.step("And: el usuario rellena la fecha de nacimiento", async () => {
    await page.locator('input[name="dob"]').fill('1992-03-17');
  });

  await test.step("And: el usuario rellena el campo Address", async () => {
    await page.locator('textarea[name="addr"]').fill('Calle 1');
  });

  await test.step("And: el usuario rellena el campo City", async () => {
    await page.locator('input[name="city"]').fill('Madrid');
  });

  await test.step("And: el usuario rellena el campo State", async () => {
    await page.locator('input[name="state"]').fill('Madrid');
  });

  await test.step("And: el usuario rellena el campo PIN", async () => {
    await page.locator('input[name="pinno"]').fill('28001');
    // Si el campo requiere exactamente 6 dígitos, usa '280001'
    // await page.locator('input[name="pinno"]').fill('280001');
  });

  await test.step("And: el usuario rellena el campo Mobile Number", async () => {
    await page.locator('input[name="telephoneno"]').fill('600123456');
  });

  await test.step("And: el usuario rellena el campo Email", async () => {
    await page.locator('input[name="emailid"]').fill('ejemplo@gmail.com');
  });

  await test.step("And: el usuario rellena el campo Password del formulario New Customer", async () => {
    await page.locator('input[name="password"]').fill('Test1234');
  });

  await test.step("Then: el usuario hace click en el botón Reset", async () => {
    await page.locator('input[type="reset"][name="res"]').click();
  });

  await test.step("Then: todos los campos del formulario New Customer quedan vacíos tras el reset", async () => {
    const nameValue = await page.locator('input[name="name"]').inputValue();
    const dobValue = await page.locator('input[name="dob"]').inputValue();
    const addrValue = await page.locator('textarea[name="addr"]').inputValue();
    const cityValue = await page.locator('input[name="city"]').inputValue();
    const stateValue = await page.locator('input[name="state"]').inputValue();
    const pinValue = await page.locator('input[name="pinno"]').inputValue();
    const phoneValue = await page.locator('input[name="telephoneno"]').inputValue();
    const emailValue = await page.locator('input[name="emailid"]').inputValue();
    const passwordValue = await page.locator('input[name="password"]').inputValue();
    const femaleChecked = await page.locator('input[name="rad1"][value="f"]').isChecked();

    expect(nameValue).toBe('');
    expect(dobValue).toBe('');
    expect(addrValue).toBe('');
    expect(cityValue).toBe('');
    expect(stateValue).toBe('');
    expect(pinValue).toBe('');
    expect(phoneValue).toBe('');
    expect(emailValue).toBe('');
    expect(passwordValue).toBe('');
    expect(femaleChecked).toBeFalsy();

    console.log({
      nameValue,
      dobValue,
      addrValue,
      cityValue,
      stateValue,
      pinValue,
      phoneValue,
      emailValue,
      passwordValue,
      femaleChecked
    });
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 3: ANÁLISIS POR SECCIONES HTML PROGRESIVAS
════════════════════════════════════════════════════════════════

📅 Generación: 24/01/2026, 20:42:43
⏱️  Tiempo: 114295ms (114.3s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente en Guru99 Bank Home Page usando User ID mngr652417 y Password UhEpYne luego acceder a la sección New Customer rellenar el formulario con datos válidos incluyendo email ejemplo@gmail.com sin tildes o caracteres especiales textos cortos pin numérico de 6 dígitos género female y fecha de nacimiento 17/03/1992 y finalmente comprobar que el botón de reset limpia todos los campos del formulario
🔄 Iteraciones: 16 análisis seccionales
📊 Líneas: 106 líneas generadas

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
  • Test name: login-y-crear-nuevo-customer-con-reset-guru99

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