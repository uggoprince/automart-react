const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;

export const isValidEmail = (email: string) => {
    return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
    return passwordRegex.test(password);
};
