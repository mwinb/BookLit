import { ReactElement } from 'react';
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Routes from '../../common/Routes';
import { LinkContainer } from 'react-router-bootstrap';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
}

function Header(props: HeaderProps): ReactElement {
  const isLoggedIn = props.isLoggedIn;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to={Routes.HOME}>
        <Navbar.Brand>Book Nook</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {!isLoggedIn && (
            <LinkContainer to={Routes.SIGN_IN}>
              <Nav.Link className="mr-sm-2">Sign In</Nav.Link>
            </LinkContainer>
          )}
          {isLoggedIn && <UserDropDown userName={props.userName}></UserDropDown>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

interface UserDropDownProps {
  userName: string;
}

function UserDropDown(props: UserDropDownProps): ReactElement {
  return (
    <>
      <NavDropdown alignRight className="" title={props.userName} id="collasible-nav-dropdown">
        <LinkContainer to={Routes.MY_SETTINGS}>
          <NavDropdown.Item>My Settings</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to={Routes.MY_CLUBS}>
          <NavDropdown.Item>My Clubs</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to={Routes.NEW_CLUB}>
          <NavDropdown.Item>New Club</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to={Routes.SIGN_OUT}>
          <NavDropdown.Item>Sign Out</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </>
  );
}

export default Header;
