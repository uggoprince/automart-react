const { NEXT_PUBLIC_API_URL } = process.env;

export const getApiUrl = () => NEXT_PUBLIC_API_URL;
export const getAuthKey = () => process.env.NEXT_PUBLIC_AUTH_KEY;
