import CryptoJS from "crypto-js";
import { getAuthKey } from "./getEnvs";

const authKey: string | any = getAuthKey();

const encryptAuth = (userStr: string) => {
  return CryptoJS.AES.encrypt(userStr, authKey);
};

const decryptAuth = (userStr: any) => {
  return CryptoJS.AES.decrypt(userStr, authKey).toString(CryptoJS.enc.Utf8);
};

export const saveAuth = (user: any) => {
  const encryptedUser: any = encryptAuth(JSON.stringify(user));
  window.localStorage.setItem(authKey, encryptedUser);
};
export const getAuth = () => {
  if (typeof window !== "undefined") {
    const storedAuth = window.localStorage.getItem(authKey);
    if (storedAuth != null) {
      const authStr = decryptAuth(storedAuth);
      return JSON.parse(authStr);
    }
    return null;
  }
  return null;
};
