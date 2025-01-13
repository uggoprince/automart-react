import { getApiUrl } from '../utilities/getEnvs';
import { post } from './https';

const apiUrl = getApiUrl();

interface SigninUserPayload {
  email: string;
  password: string;
}

export interface SignupUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface SignupFormState {
  email: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  [key: string]: string | null | undefined;
}

export const signinUser = async (formData: SigninUserPayload) => {
  return await post(formData, `${apiUrl}/auth/login`);
};

export const signupUser = async (
  formData: SignupUserPayload | SignupFormState
) => {
  return await post(formData, `${apiUrl}/users`);
};
