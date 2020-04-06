import React, { useState, ReactElement } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Routes from './common/Routes';

function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user] = useState({ userName: 'Test User' });

  return (
    <Router>
      <div>
        <Header isLoggedIn={loggedIn} userName={user.userName}></Header>
        <Switch>
          <Route exact path={Routes.HOME}>
            <LandingPage></LandingPage>
          </Route>
          <Route path={Routes.SIGN_IN}>
            <SignIn handleLogIn={() => setLoggedIn(true)} />
          </Route>
          <Route path={Routes.SIGN_OUT}>
            <SignOut handleLogout={() => setLoggedIn(false)} />
          </Route>
          <Route path={Routes.SIGN_UP}>
            <h1>Sign Up</h1>
          </Route>
          <Route path={Routes.MY_SETTINGS}>
            <h1>My Settings</h1>
          </Route>
          <Route path={Routes.MY_CLUBS}>
            <h1>My Clubs</h1>
          </Route>
          <Route path={Routes.NEW_CLUB}>
            <h1>New Club</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function SignIn(props: { handleLogIn(): void }): ReactElement {
  props.handleLogIn();
  return <Redirect to="/"></Redirect>;
}

function SignOut(props: { handleLogout(): void }): ReactElement {
  props.handleLogout();
  return <Redirect to="/" />;
}

export default App;
