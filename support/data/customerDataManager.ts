import * as fs from 'fs';
import * as path from 'path';

export interface CustomerData {
  name: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  telephone: string;
  email?: string;
  password: string;
}

export interface ValidationError {
  input: string;
  expectedError: string;
}

export interface CustomerTestData {
  validCustomers: CustomerData[];
  fieldValidationErrors: {
    [field: string]: {
      [errorType: string]: ValidationError;
    };
  };
}

class CustomerDataManager {
  private data: CustomerTestData;

  constructor() {
    const dataPath = path.join(__dirname, '../data/customer.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    this.data = JSON.parse(rawData);
  }

  getCustomerByGender(gender: string): CustomerData {
    const customer = this.data.validCustomers.find(c => c.gender === gender);
    if (!customer) {
      throw new Error(`No se encontró customer para género: ${gender}`);
    }
    return this.getCustomerWithUniqueEmail(customer);
  }

  getCustomerByName(name: string): CustomerData {
    const customer = this.data.validCustomers.find(c => c.name === name);
    if (!customer) {
      throw new Error(`No se encontró customer para nombre: ${name}`);
    }
    return this.getCustomerWithUniqueEmail(customer);
  }

  getDefaultCustomer(): CustomerData {
    return this.getCustomerWithUniqueEmail(this.data.validCustomers[0]);
  }

  // Generar email único con timestamp para evitar duplicados (máximo 17 caracteres)
  private getCustomerWithUniqueEmail(customer: CustomerData): CustomerData {
    const timestamp = Date.now().toString();
    const shortTimestamp = timestamp.slice(-7); // Últimos 7 dígitos del timestamp
    const email = `${shortTimestamp}@gmail.com`; // Exactamente 17 caracteres

    return {
      ...customer,
      email: email
    };
  }

  getValidationError(field: string, errorType: string): ValidationError {
    const fieldErrors = this.data.fieldValidationErrors[field];
    if (!fieldErrors) {
      throw new Error(`No se encontraron errores de validación para el campo: ${field}`);
    }

    const error = fieldErrors[errorType];
    if (!error) {
      throw new Error(`No se encontró error de tipo '${errorType}' para el campo '${field}'`);
    }

    return error;
  }

  getAllValidCustomers(): CustomerData[] {
    return this.data.validCustomers.map(customer => this.getCustomerWithUniqueEmail(customer));
  }

  hasValidationError(field: string, errorType: string): boolean {
    return !!(this.data.fieldValidationErrors[field] && this.data.fieldValidationErrors[field][errorType]);
  }

  getValidationErrorTypes(field: string): string[] {
    const fieldErrors = this.data.fieldValidationErrors[field];
    return fieldErrors ? Object.keys(fieldErrors) : [];
  }
}

// Exportar instancia singleton
export const customerDataManager = new CustomerDataManager();

// Funciones helper para compatibilidad
export function getCustomerByGender(gender: string): CustomerData {
  return customerDataManager.getCustomerByGender(gender);
}

export function getCustomerByName(name: string): CustomerData {
  return customerDataManager.getCustomerByName(name);
}

export function getDefaultCustomer(): CustomerData {
  return customerDataManager.getDefaultCustomer();
}

export function getValidationError(field: string, errorType: string): ValidationError {
  return customerDataManager.getValidationError(field, errorType);
}
