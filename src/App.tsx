import React, { useState, ReactElement, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { UserInterface } from './common/interfaces';
import { Form, Button } from 'react-bootstrap';
import { API } from './__mocks__';
import LandingPage from './components/pages/LandingPage/LandingPage';
import MyClubsPage from './components/pages/MyClubs/MyClubsPage';
import Header from './components/Header/Header';
import Routes from './common/Routes';
import './App.css';

function App(): ReactElement {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [api] = useState<API>(API.getInstance());

  return (
    <Router>
      <div>
        <Header user={user}></Header>
        <Switch>
          <Route exact path={Routes.HOME}>
            {user && <Redirect to={Routes.MY_CLUBS}></Redirect>}
            {!user && <LandingPage></LandingPage>}
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && (
              <SignIn
                handleLogIn={(user: UserInterface) => {
                  setUser(user);
                }}
                api={api}
              />
            )}
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

function SignIn(props: { handleLogIn(user: UserInterface): void; api: API }): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const login = useCallback(
    async (e: any): Promise<void> => {
      e.preventDefault();
      const user = await props.api.login(email, pass);
      if (user) {
        props.handleLogIn(user);
      } else {
        setEmail('');
        setPass('');
      }
    },
    [setEmail, setPass, props, email, pass],
  );

  return (
    <>
      <Form onSubmit={login}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event: any) => setEmail(event.target.value)}
            value={email}
            required={true}
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
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
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
