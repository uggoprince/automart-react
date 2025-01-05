import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BaseLayout = ({ children }: any) => {
  return (
    <div className="2xl:container relative h-screen">
      {children}
      <ToastContainer />
    </div>
  );
};
