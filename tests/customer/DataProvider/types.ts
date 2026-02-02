export interface CustomerData {
  name: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  telephone: string;
  email?: string;
  password: string;
  gender: 'male' | 'female';
}

export interface FieldValidationData {
  field: string;
  value: string;
  expectedError: string;
}
