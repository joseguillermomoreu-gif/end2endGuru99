import generateRandomText from '../../../helpers/generateRandomText';
import type { CustomerData, FieldValidationData } from './types';

export const VALID_CUSTOMERS: CustomerData[] = [
    {
        name: 'Juan Perez',
        dob: '1992-03-17',
        address: 'Calle Falsa 123',
        city: 'Madrid',
        state: 'Madrid',
        pin: '280001',
        telephone: '600123456',
        password: 'pass123',
        gender: 'male'
    },
    {
        name: 'Cristina Garcia',
        dob: '1988-11-25',
        address: 'Avenida Principal 456',
        city: 'Barcelona',
        state: 'Catalunya',
        pin: '080001',
        telephone: '634567890',
        password: 'secret456',
        gender: 'female'
    }
];
export const FIELD_VALIDATION_DATA: FieldValidationData[] = [
    {
        field: 'name',
        value: '!@#$$%^^&*()_+',
        expectedError: 'Special characters are not allowed',
    },
    {
        field: 'name',
        value: '12',
        expectedError: 'Numbers are not allowed'
    },
    {
        field: 'address',
        value: '$$$ Calle Falsa 123 ###',
        expectedError: 'Special characters are not allowed'
    },
    {
        field: 'city',
        value: '1234!@#',
        expectedError: 'Special characters are not allowed'
    },
    {
        field: 'city',
        value: '56',
        expectedError: 'Numbers are not allowed'
    },
    {
        field: 'state',
        value: '$$$',
        expectedError: 'Special characters are not allowed'
    },
    {
        field: 'state',
        value: '78',
        expectedError: 'Numbers are not allowed'
    },
    {
        field: 'pin',
        value: 'abcdef',
        expectedError: 'Characters are not allowed'
    },
    {
        field: 'pin',
        value: 'abcde!',
        expectedError: 'Special characters are not allowed'
    },
    {
        field: 'pin',
        value: '90',
        expectedError: 'PIN Code must have 6 Digits'
    },
    {
        field: 'telephone',
        value: 'phone!@#',
        expectedError: 'Special characters are not allowed'
    },
    {
        field: 'telephone',
        value: 'phoneeeeeee',
        expectedError: 'Characters are not allowed'
    },
    {
        field: 'email',
        value: 'correo_invalido@@@',
        expectedError: 'Email-ID is not valid'
    }
];

export function generateUniqueEmail(): string {
    const randomStr = generateRandomText(6);
    return `test${randomStr}@gmail.com`;
}
export function getCustomerWithEmail(customer: CustomerData): CustomerData {
    return {
        ...customer,
        email: generateUniqueEmail()
    };
}
