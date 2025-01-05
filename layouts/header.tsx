import React, { Component } from "react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import Header from "../components/header";
import HeaderLink from "../components/link";
import Navbar from "../components/navbar";

interface HeaderLayoutTypeProps {
  authData: { isAuthenticated: boolean; user: { name: string; email: string } } | null;
}

export default class HeaderLayout extends Component<HeaderLayoutTypeProps> {
  componentDidMount(): void {}
  render() {
    const { authData } = this.props;

    return (
      <Header>
        <Navbar>
          <HeaderLink href="/" text="Home" />
          {!authData && (
            <>
              <HeaderLink Icon={FiLogIn} href="/signin" text="Sign In" />
              <HeaderLink Icon={FiUserPlus} href="/signup" text="Sign Up" />
            </>
          )}
        </Navbar>
      </Header>
    );
  }
}
