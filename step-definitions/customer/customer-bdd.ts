import { Given, When, Then } from '@cucumber/cucumber';

// Importar Page Objects exactos como en el test original
import * as home from '@components/guru99/home';
import * as menuLeft from '@components/guru99/menuLeft';
import * as newCustomer from '@components/guru99/customer/new';

// Importar el sistema de datos JSON
import * as customerDataManager from '@support/data/customerDataManager';

// Variables para el scenario actual
let currentCustomer: customerDataManager.CustomerData | null = null;

// Configuración
const env = process.env;
const TEST_USER = env.testUser || 'mngr652417';

// ===== STEPS COMUNES =====
Given('que el sistema Guru99 Bank está disponible', async function () {
  // No hacer nada, la sesión ya está establecida en el hook global
});

// ===== STEPS DE CUSTOMER =====
Given('el administrador está autenticado en el sistema', async function () {
  await home.gotoHome(this.page);
  await home.checkWelcomeMessage(this.page, TEST_USER);
});

Given('accede al menú de nuevo cliente', async function () {
  await menuLeft.clickNewCustomer(this.page);
});

Given('completa el formulario con datos válidos', async function () {
  currentCustomer = customerDataManager.getDefaultCustomer();

  await newCustomer.fillValues(this.page,
    currentCustomer.name,
    currentCustomer.dob,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.state,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!,
    currentCustomer.password
  );
});

Given('está en el formulario de nuevo cliente', async function () {
  await newCustomer.isFormVisible(this.page);
});

Given('el formulario está limpio y visible', async function () {
  await newCustomer.isFormVisible(this.page);
});

// ===== WHEN STEPS =====
When('completa el formulario con datos válidos para {string} - {string}', async function (gender: string, name: string) {
  // Buscar customer exacto
  try {
    currentCustomer = customerDataManager.getCustomerByName(name);
  } catch (error) {
    currentCustomer = customerDataManager.getCustomerByGender(gender);
  }

  await newCustomer.fillValues(this.page,
    currentCustomer.name,
    currentCustomer.dob,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.state,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!,
    currentCustomer.password
  );
});

When('envía el formulario de creación', async function () {
  await newCustomer.submitForm(this.page);
});

When('envía el formulario vacío sin completar campos', async function () {
  await newCustomer.submitFormAndCheckAlert(this.page, 'please fill all fields');
});

When('modifica el campo {string} con valor inválido {string}', async function (field: string, invalidValue: string) {
  await newCustomer.fillFieldValueAndTab(this.page, field, invalidValue);
});

When('hace click en el botón reset', async function () {
  await newCustomer.resetForm(this.page);
});

When('regresa al dashboard desde el formulario', async function () {
  await newCustomer.clickHome(this.page);
});

When('completa todos los pasos de creación de cliente', async function () {
  currentCustomer = customerDataManager.getDefaultCustomer();

  await newCustomer.fillValues(this.page,
    currentCustomer.name,
    currentCustomer.dob,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.state,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!,
    currentCustomer.password
  );
  await newCustomer.submitForm(this.page);
});

When('crea un cliente con todos los datos requeridos', async function () {
  currentCustomer = customerDataManager.getDefaultCustomer();

  await newCustomer.fillValues(this.page,
    currentCustomer.name,
    currentCustomer.dob,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.state,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!,
    currentCustomer.password
  );
  await newCustomer.submitForm(this.page);
});

// ===== THEN STEPS =====
Then('el cliente debe ser creado exitosamente', async function () {
  await this.page.waitForLoadState('networkidle');

  // Verificar que estamos en página de confirmación
  const successIndicators = [
    this.page.locator('text=Customer Registered Successfully'),
    this.page.locator('text=Customer ID'),
    this.page.locator('table').nth(1)
  ];

  let found = false;
  for (const indicator of successIndicators) {
    const count = await indicator.count();
    if (count > 0) {
      found = true;
      break;
    }
  }

  if (!found) {
    throw new Error('No se encontraron indicadores de creación exitosa');
  }
});

Then('debe mostrar la tabla de confirmación con los datos correctos', async function () {
  if (!currentCustomer) {
    throw new Error('No hay datos de customer para verificar');
  }

  await newCustomer.checkConfirmationTable(this.page,
    currentCustomer.name,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!
  );
});

Then('debe aparecer un mensaje indicando que complete todos los campos', async function () {
  // Este mensaje ya se verifica en newCustomer.submitFormAndCheckAlert
});

Then('el formulario debe permanecer visible', async function () {
  await newCustomer.isFormVisible(this.page);
});

Then('debe aparecer el mensaje de error {string}', async function (expectedError: string) {
  await newCustomer.checkErrorText(this.page, expectedError);
});

Then('todos los campos deben estar vacíos', async function () {
  await newCustomer.checkEmptyForm(this.page);
});

Then('debe mostrar correctamente el dashboard principal', async function () {
  await home.checkWelcomeMessage(this.page, TEST_USER);
});

Then('debe ver el mensaje de bienvenida del administrador', async function () {
  await home.checkWelcomeMessage(this.page, TEST_USER);
});

Then('debe ver el menú lateral disponible', async function () {
  await menuLeft.isVisible(this.page);
});

Then('el proceso debe completarse exitosamente', async function () {
  await this.page.waitForLoadState('networkidle');
});

Then('debe poder navegar de vuelta al dashboard', async function () {
  // Hacer click en el botón Continue para volver al dashboard
  await this.page.getByText('Continue').click();
  await this.page.waitForLoadState('networkidle');

  // Verificar que estamos en el dashboard
  await home.checkWelcomeMessage(this.page, TEST_USER);
  await menuLeft.isVisible(this.page);

  currentCustomer = null;
});

Then('la tabla de confirmación debe mostrar exactamente los mismos datos', async function () {
  if (!currentCustomer) {
    throw new Error('No hay datos de customer para verificar integridad');
  }

  await newCustomer.checkConfirmationTable(this.page,
    currentCustomer.name,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!
  );
});

Then('no debe haber discrepancias en los valores mostrados', async function () {
  // Esta verificación ya se hace en newCustomer.checkConfirmationTable
});
