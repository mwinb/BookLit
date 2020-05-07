import React, { useState, ReactElement, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { UserInterface } from './common/interfaces';
import { Routes } from './common/Routes';
import { mockUsers } from './__mocks__';
import LandingPage from './components/pages/LandingPage/LandingPage';
import MyClubsPage from './components/pages/MyClubs/MyClubsPage';
import NewClubPage from './components/pages/NewClub/NewClub';
import Header from './components/Header/Header';
import SignInPage from './components/pages/SignIn/SignInPage';
import './App.css';
import ClubPage from './components/pages/ClubPage/ClubPage';
import PageWrapper from './components/PageWrapper/PageWrapper';

function App(): ReactElement {
  const [user, setUser] = useState<UserInterface | undefined>(mockUsers[0]);

  return (
    <PageWrapper>
      <Router>
        <Header user={user} />
        <Switch>
          <Route exact path={Routes.HOME}>
            {user && <Redirect to={Routes.MY_CLUBS}></Redirect>}
            {!user && <LandingPage></LandingPage>}
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && <SignInPage handleLogIn={setUser} />}
            {user && <Redirect to={Routes.MY_CLUBS} />}
          </Route>
          <Route path={Routes.SIGN_OUT}>
            <SignOut
              handleLogout={() => {
                setUser(undefined);
              }}
            />
          </Route>
          <Route path={Routes.SIGN_UP}>
            <h1>Sign Up</h1>
          </Route>
          <Route path={Routes.MY_SETTINGS}>
            <h1>My Settings</h1>
          </Route>
          <Route path={Routes.MY_CLUBS}>
            {user && <MyClubsPage user={user} />}
            {!user && <Redirect to={Routes.HOME}></Redirect>}
          </Route>
          <Route path={Routes.NEW_CLUB}>
            {user && <NewClubPage setUser={setUser} user={user} />}
            {!user && <Redirect to={Routes.HOME}></Redirect>}{' '}
          </Route>
          <Route path={Routes.CLUB}>
            {user && <ClubPage user={user} />}
            {!user && <Redirect to={Routes.HOME} />}
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

function SignOut(props: { handleLogout(): void }): ReactElement {
  useEffect(() => {
    props.handleLogout();
  }, [props]);
  return <Redirect to="/" />;
}

export default App;
