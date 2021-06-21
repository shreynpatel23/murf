import validator from "validator";

export const numberRegexp = /\d/;
export const specialCharRegexp = /[!@#$%^&*(),.?":{}|<>]/;
export const alphaNumericRegexp = /^[a-zA-Z0-9 ]+$/;
export const alphabetRegExp = /^[a-zA-Z ]+$/;

export function isInputEmpty(value: string): boolean {
  return validator.isEmpty(value, { ignore_whitespace: true });
}

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function isValidName(name: string, isNumberAllowed: boolean): boolean {
  if (isNumberAllowed) {
    return alphaNumericRegexp.test(name) && !specialCharRegexp.test(name);
  }
  return alphabetRegExp.test(name) && !specialCharRegexp.test(name);
}
