import { ReactElement } from 'react';
import React from 'react';
import './LandingPage.css';
import Routes from '../../common/Routes';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function LandingPage(): ReactElement {
  return (
    <div className="landingJumbo">
      <div style={{ backgroundColor: 'rgba(4, 1, 0, .7)', padding: '15vw', height: '100vh' }}>
        <h1>Welcome To Book Nook!</h1>
        <p className="aboutText" style={{ marginTop: 0, marginBottom: 0 }}>
          Connect with friends or other readers around the world instantly.
        </p>
        <p className="aboutText">Read, discuss, and socialize with friends or strangers in small groups.</p>
        <LinkContainer to={Routes.SIGN_UP}>
          <Button>Sign Up</Button>
        </LinkContainer>
      </div>
    </div>
  );
}

export default LandingPage;
