import React, { useState, useEffect, ReactElement } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Routes from './common/Routes';
import { UserInterface } from './common/interfaces';
import { Form, Button } from 'react-bootstrap';
import { API } from './__mocks__';

function App(): ReactElement {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInterface>();
  const [api] = useState<API>(API.getInstance());

  return (
    <Router>
      <div>
        <Header isLoggedIn={loggedIn} user={user}></Header>
        <Switch>
          <Route exact path={Routes.HOME}>
            <LandingPage></LandingPage>
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!loggedIn && (
              <SignIn
                handleLogIn={(user: UserInterface) => {
                  setUser(user);
                  setLoggedIn(true);
                }}
                api={api}
              />
            )}
            {loggedIn && <Redirect to={Routes.MY_CLUBS} />}
          </Route>
          <Route path={Routes.SIGN_OUT}>
            <SignOut
              handleLogout={() => {
                setLoggedIn(false);
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

function SignIn(props: { handleLogIn(user: UserInterface): void; api: API }): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const login = async (): Promise<void> => {
    const user = await props.api.login(email, pass);
    if (user) {
      props.handleLogIn(user);
    }
    setSubmitted(false);
    setEmail('');
    setPass('');
  };

  useEffect(() => {
    if (submitted) {
      login();
    }
  }, [submitted, login]);

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event: any) => setEmail(event.target.value)}
            value={email}
            required
          />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(event: any) => setPass(event.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => setSubmitted(true)}>
          Submit
        </Button>
      </Form>
    </>
  );
}

function SignOut(props: { handleLogout(): void }): ReactElement {
  props.handleLogout();
  return <Redirect to="/" />;
}

export default App;
