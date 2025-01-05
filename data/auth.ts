import { getApiUrl } from "../utilities/getEnvs";

const apiUrl = getApiUrl();

export const signinUser = async (formData: any) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
};
