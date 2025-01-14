import React, { Component } from 'react';
import { FiLogIn, FiUserPlus, FiLogOut, FiHome } from 'react-icons/fi';
import Header from '../components/header';
import HeaderLink, { HeaderButton } from '../components/link';
import Navbar from '../components/navbar';
import { removeAuth } from '../utilities/storage';
import { NextRouter } from 'next/router';
import { JSONObject } from '../utilities/types';

interface HeaderLayoutTypeProps {
  authData: null | JSONObject;
  router: NextRouter;
  // setAuthData: (authData: HeaderLayoutTypeProps['authData']) => void;
  setAuthUser: (user: JSONObject | null) => void;
}

export default class HeaderLayout extends Component<HeaderLayoutTypeProps> {
  componentDidMount(): void {}

  render() {
    const { authData, setAuthUser } = this.props;

    return (
      <Header>
        <Navbar>
          <HeaderLink href='/' text='Home' Icon={FiHome} />
          {!authData && (
            <>
              <HeaderLink Icon={FiLogIn} href='/signin' text='Sign In' />
              <HeaderLink Icon={FiUserPlus} href='/signup' text='Sign Up' />
            </>
          )}
          {authData && (
            <HeaderButton
              text='Logout'
              Icon={FiLogOut}
              handleClick={() => {
                removeAuth();
                setAuthUser(null);
                this.props.router.push('/');
              }}
            />
          )}
        </Navbar>
      </Header>
    );
  }
}
