export const nameInputLocator: string = 'input[name="name"]';
export const dobInputLocator: string = 'input[name="dob"]';
export const addressTextareaLocator: string = 'textarea[name="addr"]';
export const cityInputLocator: string = 'input[name="city"]';
export const stateInputLocator: string = 'input[name="state"]';
export const pinInputLocator: string = 'input[name="pinno"]';
export const telephoneInputLocator: string = 'input[name="telephoneno"]';
export const emailInputLocator: string = 'input[name="emailid"]';
export const passwordInputLocator: string = 'input[name="password"]';
export const submitButtonLocator: string = 'input[type="submit"]';
export const resetButtonLocator: string = 'input[type="reset"]';
export const confirmationTableLocator: string = 'table#customer';
export const homeLinkLocator: string = '.menusubnav a:has-text("Manager")';
export const fieldMap: { [key: string]: string } = {
    'name': nameInputLocator,
    'dob': dobInputLocator,
    'address': addressTextareaLocator,
    'city': cityInputLocator,
    'state': stateInputLocator,
    'pin': pinInputLocator,
    'telephone': telephoneInputLocator,
    'email': emailInputLocator,
    'password': passwordInputLocator
};