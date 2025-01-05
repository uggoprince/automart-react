import { toast } from "react-toastify";

export const ToastSuccess = ({ message = "Success!" } = {}) => {
    toast.success(message);
};

export const ToastError = ({ message = "Error!" } = {}) => {
    toast.error(message);
};

