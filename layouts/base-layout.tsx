import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className='2xl:container relative h-screen'>
      {children}
      <ToastContainer />
    </div>
  );
};
