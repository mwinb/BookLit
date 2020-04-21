import { ReactElement } from 'react';
import React from 'react';
import './LandingPage.css';
import Routes from '../../../common/Routes';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ImageCredit from '../../../common/components/ImageCredit';

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
        <br />
      </div>
      <div style={{ position: 'absolute', bottom: 0, margin: 2 }}>
        <ImageCredit
          url={
            'https://unsplash.com/@nbb_photos?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge'
          }
          label={'Lacie Slezak'}
        />
      </div>
    </div>
  );
}

export default LandingPage;
