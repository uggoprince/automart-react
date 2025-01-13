export const post = async (formData: unknown, url: string) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    return error;
  }
};
