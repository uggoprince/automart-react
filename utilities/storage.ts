import CryptoJS from 'crypto-js';
import { getAuthKey } from './getEnvs';

const authKey: string = getAuthKey() || 'defaultAuthKey';

const encryptAuth = (userStr: string): string => {
  return CryptoJS.AES.encrypt(userStr, authKey).toString();
};

const decryptAuth = (encryptedStr: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedStr, authKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt auth data:', error);
    return null;
  }
};

export const saveAuth = (user: Record<string, unknown>): void => {
  try {
    const userStr = JSON.stringify(user);
    const encryptedUser = encryptAuth(userStr);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('auth', encryptedUser);
    }
  } catch (error) {
    console.error('Failed to save auth data:', error);
  }
};

export const getAuth = (): Record<string, unknown> | null => {
  if (typeof window !== 'undefined') {
    try {
      const storedAuth = window.localStorage.getItem('auth');
      if (storedAuth) {
        const authStr = decryptAuth(storedAuth);
        if (authStr) {
          return JSON.parse(authStr);
        }
      }
    } catch (error) {
      console.error('Failed to retrieve auth data:', error);
    }
  }
  return null;
};

export const removeAuth = (): void => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth');
    }
  } catch (error) {
    console.error('Failed to remove data:', error);
  }
};
