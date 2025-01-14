import { NextPage } from 'next';
import { BaseLayout } from './base-layout';
import BgImage from '../components/background/bg-image';
import HeaderLayout from './header';
import Backdrop from '../components/background/backdrop';
import { useAuth } from '../auth/AuthContext';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface GeneralLayoutProps {
  children: ReactNode;
}

const GeneralLayout: NextPage<GeneralLayoutProps> = ({ children }) => {
  const { getAuthUser, setAuthUser } = useAuth();
  const router = useRouter();
  return (
    <BaseLayout>
      <BgImage>
        <HeaderLayout
          authData={getAuthUser()}
          router={router}
          setAuthUser={setAuthUser}
        />
        <Backdrop>{children}</Backdrop>
      </BgImage>
    </BaseLayout>
  );
};

export default GeneralLayout;
