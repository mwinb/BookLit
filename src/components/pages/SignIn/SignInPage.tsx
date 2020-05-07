import { UserInterface } from '../../../common/interfaces';
import React, { ReactElement, useState, useCallback } from 'react';
import { Alert, Card, Form, Button } from 'react-bootstrap';
import { login } from '../../../__mocks__';

function SignInPage(props: { handleLogIn(user: UserInterface): void }): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [error, setError] = useState<string>();

  const executeLogin = useCallback(
    async (e: any): Promise<void> => {
      e.preventDefault();
      const user = await login(email, pass);
      if (user) {
        props.handleLogIn(user);
      } else {
        setEmail('');
        setPass('');
        setError('Invalid Email or Password');
      }
    },
    [setEmail, setPass, props, email, pass, setError],
  );

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card bg="dark" text="white" style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', padding: '2%' }}>
        <Form onSubmit={executeLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event: any) => setEmail(event.target.value)}
              value={email}
              style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
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
              style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
              onChange={(event: any) => setPass(event.target.value)}
              required={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default SignInPage;
