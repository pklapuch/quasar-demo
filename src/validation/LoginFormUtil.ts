import { isEmptyString } from './StringUtil';

export interface ValidationResult {
  isInvalid: boolean;
  errorMessage: string | null;
}

export function validateEmail(value: string): ValidationResult {
  if (isEmptyString(value)) {
    return { isInvalid: true, errorMessage: 'Value cannot be empty!' };
  }

  if (!isValidEmail(value)) {
    return { isInvalid: true, errorMessage: 'Invalid email address!' };
  }

  return { isInvalid: false, errorMessage: null };
}

export function validatePassword(value: string): ValidationResult {
  if (isEmptyString(value)) {
    return { isInvalid: true, errorMessage: 'Value cannot be empty!' };
  }

  return { isInvalid: false, errorMessage: null };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
