import { ReactElement } from 'react';
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserInterface } from '../../common/interfaces';
import { useLocation } from 'react-router-dom';
import { RouteTitles } from '../../common/Routes/RouteTitles';
import { Routes } from '../../common/Routes';

export interface HeaderProps {
  user?: UserInterface;
}

function Header(props: HeaderProps): ReactElement {
  const isLoggedIn = props.user !== undefined;
  const route = RouteTitles.get(useLocation().pathname);
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to={Routes.HOME}>
        <Navbar.Brand>Book Nook</Navbar.Brand>
      </LinkContainer>

      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <Navbar.Brand>{route}</Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" activeKey={route}>
          {!isLoggedIn && (
            <LinkContainer to={Routes.SIGN_IN}>
              <Nav.Link className="mr-sm-2" eventKey={Routes.SIGN_IN}>
                Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          {isLoggedIn && <UserDropDown user={props.user}></UserDropDown>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

interface UserDropDownProps {
  user?: UserInterface;
}

function UserDropDown(props: UserDropDownProps): ReactElement {
  return (
    <>
      <NavDropdown alignRight className="danger" title={props.user?.name} id="collasible-nav-dropdown">
        <LinkContainer to={Routes.MY_SETTINGS}>
          <NavDropdown.Item className="dark-link" eventKey={Routes.MY_SETTINGS}>
            My Settings
          </NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to={Routes.MY_CLUBS}>
          <NavDropdown.Item eventKey={Routes.MY_CLUBS}>My Clubs</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to={Routes.NEW_CLUB}>
          <NavDropdown.Item eventKey={Routes.NEW_CLUB}>New Club</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to={Routes.SIGN_OUT}>
          <NavDropdown.Item eventKey={Routes.SIGN_OUT}>Sign Out</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </>
  );
}

export default Header;
