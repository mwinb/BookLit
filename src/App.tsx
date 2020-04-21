import React, { useState, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { UserInterface } from './common/interfaces';
import { Routes } from './common/Routes';
import { API } from './__mocks__';
import LandingPage from './components/pages/LandingPage/LandingPage';
import MyClubsPage from './components/pages/MyClubs/MyClubsPage';
import Header from './components/Header/Header';
import SignInPage from './components/pages/SignIn/SignInPage';
import './App.css';

function App(): ReactElement {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [api] = useState<API>(API.getInstance());

  return (
    <Router>
      <div>
        <Header user={user} />
        <Switch>
          <Route exact path={Routes.HOME}>
            {user && <Redirect to={Routes.MY_CLUBS}></Redirect>}
            {!user && <LandingPage></LandingPage>}
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && <SignInPage handleLogIn={setUser} api={api} />}
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
            {user && <MyClubsPage user={user} api={api} />}
            {!user && <Redirect to={Routes.HOME}></Redirect>}
          </Route>
          <Route path={Routes.NEW_CLUB}>
            <h1>New Club</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function SignOut(props: { handleLogout(): void }): ReactElement {
  props.handleLogout();
  return <Redirect to="/" />;
}

export default App;
