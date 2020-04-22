import { ReactElement } from 'react';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserInterface } from '../../common/interfaces';
import { useLocation } from 'react-router-dom';
import { RouteTitles } from '../../common/Routes/RouteTitles';
import { Routes } from '../../common/Routes';

export interface HeaderProps {
  user?: UserInterface;
}

function Header(props: HeaderProps): ReactElement {
  const route = RouteTitles.get(useLocation().pathname);
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to={Routes.HOME}>
        <Navbar.Brand>Book Nook</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" activeKey={route}>
          {!props.user && (
            <LinkContainer to={Routes.SIGN_IN}>
              <Nav.Link className="mr-sm-2" eventKey={Routes.SIGN_IN}>
                Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          {props.user && <UserDropDown user={props.user}></UserDropDown>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

interface UserDropDownProps {
  user: UserInterface;
}

function UserDropDown(props: UserDropDownProps): ReactElement {
  return (
    <>
      <Navbar.Brand>{props.user.name}</Navbar.Brand>
      <LinkContainer to={Routes.MY_SETTINGS}>
        <Nav.Link eventKey={Routes.MY_SETTINGS}>My Settings</Nav.Link>
      </LinkContainer>
      <LinkContainer to={Routes.MY_CLUBS}>
        <Nav.Link eventKey={Routes.MY_CLUBS}>My Clubs</Nav.Link>
      </LinkContainer>
      <LinkContainer to={Routes.NEW_CLUB}>
        <Nav.Link eventKey={Routes.NEW_CLUB}>New Club</Nav.Link>
      </LinkContainer>
      <LinkContainer to={Routes.SIGN_OUT}>
        <Nav.Link eventKey={Routes.SIGN_OUT}>Sign Out</Nav.Link>
      </LinkContainer>
    </>
  );
}

export default Header;
