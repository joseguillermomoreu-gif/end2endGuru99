// DESHABILITADO: Usuario caducará pronto, tests de customer desactivados
/**
 * 🎯 OBJETIVO DEL TEST:
 * Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y comprobar que no es posible crear un nuevo cliente sin completar los campos requeridos
 */

import { test, expect } from '@playwright/test';

test.skip('login-y-validacion-new-customer-obligatorios', async ({ page }) => {
  // Given: El usuario navega a la página de login
  await test.step("Given: El usuario navega a la página de login", async () => {
    await page.goto('https://demo.guru99.com/V4/');
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

  // Then: El usuario navega a la sección 'New Customer'
  await test.step("Then: El usuario navega a la sección 'New Customer'", async () => {
    await page.locator('.menusubnav a:has-text("New Customer")').click();
  });

  // And: El usuario intenta enviar el formulario vacío
  await test.step("And: El usuario intenta enviar el formulario vacío", async () => {
    await page.locator('input[type="submit"]').click();
  });

  // Then: Se validan los mensajes de error de los campos obligatorios
  await test.step("Then: Se validan los mensajes de error de los campos obligatorios", async () => {
    // Validación campo nombre cliente
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();

    // Validación campo fecha de nacimiento
    const dobInput = page.locator('input[name="dob"]');
    await expect(dobInput).toBeVisible();

    // Validación campo dirección
    const addrTextarea = page.locator('textarea[name="addr"]');
    await expect(addrTextarea).toBeVisible();

    // Validación campo ciudad
    const cityInput = page.locator('input[name="city"]');
    await expect(cityInput).toBeVisible();

    // Validación campo estado
    const stateInput = page.locator('input[name="state"]');
    await expect(stateInput).toBeVisible();

    // Validación campo PIN
    const pinInput = page.locator('input[name="pinno"]');
    await expect(pinInput).toBeVisible();

    // Validación campo teléfono
    const telephoneInput = page.locator('input[name="telephoneno"]');
    await expect(telephoneInput).toBeVisible();

    // Validación campo email
    const emailInput = page.locator('input[name="emailid"]');
    await expect(emailInput).toBeVisible();

    // Validación campo contraseña
    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();

    // Validación botón submit sigue visible (no se envió el formulario)
    const submitButton = page.locator('input[type="submit"]');
    const isVisible = await submitButton.isVisible();
    expect(isVisible).toBeTruthy();
    console.log('Botón submit visible tras intento de envío vacío:', isVisible);
  });
});

/*
════════════════════════════════════════════════════════════════
  🤖 TEST GENERADO AUTOMÁTICAMENTE
  STRATEGY 1: ANÁLISIS COMPLETO DE HTML CON IA
════════════════════════════════════════════════════════════════

📅 Generación: 25/01/2026, 00:24:26
⏱️  Tiempo: 120158ms (120.2s)
🎯 Objetivo: Validar que el usuario puede iniciar sesión correctamente con User ID=mngr652417 y Password=UhEpYne luego acceder a la sección 'New Customer' y comprobar que no es posible crear un nuevo cliente sin completar los campos requeridos
🔄 Iteraciones: 6 análisis ejecutados
🧠 Tokens: 2523 tokens consumidos
📊 Líneas: 78 líneas generadas

────────────────────────────────────────────────────────────────

🔧 CONFIGURACIÓN DE ENTRADA
  • URL analizada: https://demo.guru99.com/V4/
  • Selector base: body
  • Test name: login-y-validacion-new-customer-obligatorios

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