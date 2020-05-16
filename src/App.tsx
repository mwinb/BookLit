import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import RedirectWrapper from './components/RedirectWrapper/RedirectWrapper';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage/LandingPage';
import { DEFAULT_USER, UserInterface } from './common/interfaces';
import MyClubsPage from './components/pages/MyClubs/MyClubsPage';
import PageWrapper from './components/PageWrapper/PageWrapper';
import SignInPage from './components/pages/SignIn/SignInPage';
import NewClubPage from './components/pages/NewClub/NewClub';
import ClubPage from './components/pages/ClubPage/ClubPage';
import { useUser } from './common/context/UserContext';
import Header from './components/Header/Header';
import { getUserById } from './__mocks__';
import { Routes } from './common/Routes';
import './App.css';

export const USER_KEY = 'user';

function App(): ReactElement {
  const { user, setUser } = useUser();
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUser(DEFAULT_USER);
    setSignedIn(false);
  }, [setUser]);

  const handleLogin = useCallback(
    async (user: UserInterface): Promise<void> => {
      const validUser = await getUserById(user.id);
      if (validUser) {
        window.localStorage.setItem(USER_KEY, user.id);
        setUser(validUser);
        setSignedIn(true);
      } else {
        handleLogout();
      }
    },
    [setUser, handleLogout],
  );

  useEffect(() => {
    const userId = window.localStorage.getItem(USER_KEY);
    if (userId && !signedIn) {
      handleLogin({ ...user, id: userId });
    }
  }, [user, setUser, handleLogin, signedIn]);

  return (
    <PageWrapper>
      <Router>
        <Header user={user} />
        <Switch>
          <Route exact path={Routes.HOME}>
            {!signedIn ? <LandingPage></LandingPage> : <RedirectWrapper to={Routes.MY_CLUBS} />}
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!signedIn ? <SignInPage handleLogIn={handleLogin} /> : <RedirectWrapper to={Routes.MY_CLUBS} />}
          </Route>
          <Route path={Routes.SIGN_OUT}>
            <SignOut handleLogout={handleLogout} />
          </Route>
          <Route path={Routes.SIGN_UP}>
            <h1>Sign Up</h1>
          </Route>
          <Route path={Routes.MY_SETTINGS}>
            <h1>My Settings</h1>
          </Route>
          <Route path={Routes.MY_CLUBS}>
            {!signedIn ? <RedirectWrapper to={Routes.HOME} /> : <MyClubsPage user={user} />}
          </Route>
          <Route path={Routes.NEW_CLUB}>
            {!signedIn ? <RedirectWrapper to={Routes.HOME} /> : <NewClubPage setUser={setUser} user={user} />}
          </Route>
          <Route path={Routes.CLUB}>
            {!signedIn ? <RedirectWrapper to={Routes.HOME} /> : <ClubPage user={user} />}
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
  return <RedirectWrapper to="/" />;
}

export default App;
