import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '@support/world';

// Importar Page Objects existentes
import * as home from '@components/guru99/home';
import * as menuLeft from '@components/guru99/menuLeft';
import * as customerNew from '@components/guru99/customer/new';

// Importar el nuevo sistema de datos JSON (exports nombrados)
import {
  CustomerData,
  getCustomerByGender,
  getCustomerByName,
  getDefaultCustomer
} from '@support/data/customerDataManager';

const env = process.env;
let currentCustomer: CustomerData;

// Given steps - Precondiciones

Given('el administrador está autenticado en el sistema', async function (this: CustomWorld) {
  await home.gotoHome(this.page);
  const testUser = env.testUser || 'mngr652417';
  await home.checkWelcomeMessage(this.page, testUser);
});

Given('accede al menú de nuevo cliente', async function (this: CustomWorld) {
  await menuLeft.clickNewCustomer(this.page);
  await customerNew.isFormVisible(this.page);
});

// When steps - Acciones

When('completa el formulario con datos válidos para {string} - {string}', async function (this: CustomWorld, gender: string, name: string) {
  // Buscar customer exacto usando el nuevo sistema JSON
  try {
    currentCustomer = getCustomerByName(name);
  } catch (error) {
    currentCustomer = getCustomerByGender(gender);
  }

  await customerNew.fillValues(
    this.page,
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

When('envía el formulario de creación', async function (this: CustomWorld) {
  await customerNew.submitForm(this.page);
});

// Then steps - Verificaciones

Then('el cliente debe ser creado exitosamente', async function (this: CustomWorld) {
  await this.page.waitForLoadState('networkidle');
});

Then('debe mostrar la tabla de confirmación con los datos correctos', async function (this: CustomWorld) {
  if (!currentCustomer) {
    throw new Error('No hay datos de customer para verificar');
  }

  await customerNew.checkConfirmationTable(
    this.page,
    currentCustomer.name,
    currentCustomer.address,
    currentCustomer.city,
    currentCustomer.pin,
    currentCustomer.telephone,
    currentCustomer.email!
  );
});
