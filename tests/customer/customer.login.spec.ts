import { test } from '@playwright/test';
import * as home from 'components/guru99/home';
import * as menuLeft from 'components/guru99/menuLeft';
import * as customerNew from 'components/guru99/customer/new';
import {
    VALID_CUSTOMERS,
    FIELD_VALIDATION_DATA,
    getCustomerWithEmail
} from './DataProvider/customer.DataProvider';

test.describe.configure({ retries: 1 });

for (const customerData of VALID_CUSTOMERS) {
    const INFO_TEST_CREATE = {
        tag: `@CUSTOMER_CREATE_${customerData.gender.toUpperCase()}`,
        annotation: [{ type: 'doc', description: `Verificar creación exitosa customer ${customerData.gender} - ${customerData.name}` }]
    };
    test(`Crear customer ${customerData.gender} - ${customerData.name}`, INFO_TEST_CREATE, async ({ page }) => {
        const customerWithEmail = getCustomerWithEmail(customerData);
        await test.step("Given: Un usuario admin loggeado accede a la home", async () => {
            await home.gotoHome(page);
        });
        await test.step("Given: accede al menú lateral de New Customer", async () => {
            await menuLeft.clickNewCustomer(page);
        });
        await test.step(`When: completa formulario con datos ${customerData.gender} y lo envía`, async () => {
            await customerNew.fillValues(page,
                customerWithEmail.name,
                customerWithEmail.dob,
                customerWithEmail.address,
                customerWithEmail.city,
                customerWithEmail.state,
                customerWithEmail.pin,
                customerWithEmail.telephone,
                customerWithEmail.email,
                customerWithEmail.password
            );
            await customerNew.submitForm(page);
        });
        await test.step("Then: se crea el customer exitosamente y se muestra tabla de confirmación", async () => {
            await customerNew.checkConfirmationTable(page,
                customerWithEmail.name,
                customerWithEmail.address,
                customerWithEmail.city,
                customerWithEmail.pin,
                customerWithEmail.telephone,
                customerWithEmail.email
            );
        });
    });
}

const INFO_TEST_REQUIRED = {
    tag: `@CUSTOMER_CREATE_REQUIRED_FIELDS`,
    annotation: [{ type: 'doc', description: 'Verificar que formulario vacío no se envía' }]
};
test('Validar que los campos obligatorios son requeridos', INFO_TEST_REQUIRED, async ({ page }) => {
    await test.step("Given: Un usuario admin loggeado accede a la home", async () => {
        await home.gotoHome(page);
    });
    await test.step("Given: accede al menú lateral de New Customer", async () => {
        await menuLeft.clickNewCustomer(page);
    });
    await test.step("When: envía el formulario vacío sin completar campos", async () => {
        await customerNew.submitFormAndCheckAlert(page, 'please fill all fields');
    });
    await test.step("Then: el formulario no se envía y permanece visible", async () => {
        await customerNew.isFormVisible(page);
    });
});

for (const validationCase of FIELD_VALIDATION_DATA) {
    const INFO_TEST_VALIDATION = {
        tag: `@CUSTOMER_CREATE_INVALID_FIELDS`,
        annotation: [{ type: 'doc', description: `Validar campo ${validationCase.field}: ${validationCase.expectedError}` }]
    };
    test(`Validar campo ${validationCase.field} - ${validationCase.expectedError}`, INFO_TEST_VALIDATION, async ({ page }) => {
        const customerData = getCustomerWithEmail(VALID_CUSTOMERS[0]);
        await test.step("Given: Un usuario admin loggeado accede a la home", async () => {
            await home.gotoHome(page);
        });
        await test.step("Given: accede al menú lateral de New Customer", async () => {
            await menuLeft.clickNewCustomer(page);
        });
        await test.step(`Given: completa formulario con datos validos`, async () => {
            await customerNew.fillValues(page,
                customerData.name,
                customerData.dob,
                customerData.address,
                customerData.city,
                customerData.state,
                customerData.pin,
                customerData.telephone,
                customerData.email,
                customerData.password
            );
        });
        await test.step(`When: modifica campo ${validationCase.field} con valor inválido '${validationCase.value}'`, async () => {
            await customerNew.fillFieldValueAndTab(page, validationCase.field, validationCase.value);
        });
        await test.step(`Then: aparece alert de validación en el formulario: ${validationCase.expectedError}`, async () => {
            await customerNew.checkErrorText(page, validationCase.expectedError);
        });
    });
}

const INFO_TEST_RESET = {
    tag: `@CUSTOMER_CREATE_RESET_FORM`,
    annotation: [{ type: 'doc', description: 'Verificar funcionalidad reset limpia formulario' }]
};
test('Comprobar que el botón reset limpia el formulario', INFO_TEST_RESET, async ({ page }) => {
    const testCustomer = getCustomerWithEmail(VALID_CUSTOMERS[0]);
    await test.step("Given: Un usuario admin loggeado accede a la home", async () => {
        await home.gotoHome(page);
    });
    await test.step("Given: accede al menú lateral de New Customer", async () => {
        await menuLeft.clickNewCustomer(page);
    });
    await test.step("When: completa el formulario y hace click en reset", async () => {
        await customerNew.fillValues(page,
            testCustomer.name,
            testCustomer.dob,
            testCustomer.address,
            testCustomer.city,
            testCustomer.state,
            testCustomer.pin,
            testCustomer.telephone,
            testCustomer.email,
            testCustomer.password
        );
        await customerNew.resetForm(page);
    });

    await test.step("Then: todos los campos se vacían completamente", async () => {
        await customerNew.checkEmptyForm(page);
    });
});

const INFO_TEST_NAVIGATION = {
    tag: `@CUSTOMER_CREATE_NAVIGATION_BACK`,
    annotation: [{ type: 'doc', description: 'Verificar navegación de vuelta al dashboard' }]
};
test('Verificar navegación de vuelta al dashboard desde formulario', INFO_TEST_NAVIGATION, async ({ page }) => {
    await test.step("Given: Un usuario admin loggeado accede a la home", async () => {
        await home.gotoHome(page);
        const user = process.env.testUser;
        await home.checkWelcomeMessage(page, user || '');
    });
    await test.step("Given: accede al menú lateral de New Customer", async () => {
        await menuLeft.clickNewCustomer(page);
        await customerNew.isFormVisible(page);
    });
    await test.step("When: regresa al dashboard desde el formulario", async () => {
        await customerNew.clickHome(page);
    });
    await test.step("Then: se muestra correctamente el dashboard principal", async () => {
        const user = process.env.testUser;
        await home.checkWelcomeMessage(page,user || '');
        await menuLeft.isVisible(page);
    });
});
