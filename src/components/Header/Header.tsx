import { ReactElement } from 'react';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserInterface, DEFAULT_USER } from '../../common/interfaces';
import { useLocation } from 'react-router-dom';
import { RouteTitles } from '../../common/Routes/RouteTitles';
import { Routes } from '../../common/Routes';

export interface HeaderProps {
  user: UserInterface;
}

function Header(props: HeaderProps): ReactElement {
  const route = RouteTitles.get(useLocation().pathname);

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="p-1">
      <LinkContainer to={Routes.HOME}>
        <Navbar.Brand>Book Nook</Navbar.Brand>
      </LinkContainer>
      <Navbar.Text>{props.user?.username}</Navbar.Text>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" activeKey={route}>
          {props.user.id === DEFAULT_USER.id && (
            <LinkContainer to={Routes.SIGN_IN}>
              <Nav.Link className="mr-sm-2" eventKey={Routes.SIGN_IN}>
                Sign In
              </Nav.Link>
            </LinkContainer>
          )}
          {props.user.id !== DEFAULT_USER.id && (
            <>
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
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
