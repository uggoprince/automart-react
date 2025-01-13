import { SignupFormState, SignupUserPayload } from '../data/auth';
import { invalidEmailErrorText, invalidPasswordErrorText } from './message';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;

export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
  return passwordRegex.test(password);
};

export const signupValidation = (form: SignupFormState | SignupUserPayload) => {
  let hasErrors = false;
  const validationErrors = {} as SignupFormState;
  const { email, password } = form;
  if (!isValidEmail(email ?? '')) {
    hasErrors = true;
    validationErrors['email'] = invalidEmailErrorText;
  }
  if (!isPasswordValid(password ?? '')) {
    hasErrors = true;
    validationErrors['password'] = invalidPasswordErrorText;
  }
  return { hasErrors, validationErrors };
};
