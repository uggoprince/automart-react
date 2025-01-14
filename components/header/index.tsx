/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import { ReactNode } from 'react';

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header
      className='
      px-5
      py-3
      sm:py-2
      min-h-6
      shadow-md
      justify-between
      flex
      flex-row w-full sticky top-0 left-0 right-0 bg-white z-10'
    >
      <Image
        className=''
        src={'/apple-touch-icon.svg'}
        width={40}
        height={40}
      />
      {children}
    </header>
  );
};

export default Header;
