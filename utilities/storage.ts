import CryptoJS from 'crypto-js';
import { getAuthKey } from './getEnvs';

const authKey: string = getAuthKey() || 'defaultAuthKey';

const encryptAuth = (userStr: string): string => {
  return CryptoJS.AES.encrypt(userStr, authKey).toString();
};

// const encryptAuth = (userStr: string) => {
//   return CryptoJS.AES.encrypt(userStr, authKey);
// };

// const decryptAuth = (userStr: any) => {
//   return CryptoJS.AES.decrypt(userStr, authKey).toString(CryptoJS.enc.Utf8);
// };

const decryptAuth = (encryptedStr: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedStr, authKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt auth data:', error);
    return null;
  }
};

// export const saveAuth = (user: any) => {
//   const encryptedUser: any = encryptAuth(JSON.stringify(user));
//   window.localStorage.setItem(authKey, encryptedUser);
// };

// export const getAuth = () => {
//   if (typeof window !== 'undefined') {
//     const storedAuth = window.localStorage.getItem(authKey);
//     if (storedAuth != null) {
//       const authStr = decryptAuth(storedAuth);
//       return JSON.parse(authStr);
//     }
//     return null;
//   }
//   return null;
// };

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
