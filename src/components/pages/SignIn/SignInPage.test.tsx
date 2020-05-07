import { ReactWrapper, mount } from 'enzyme';
import SignInPage from './SignInPage';
import React from 'react';
import { UserInterface } from '../../../common/interfaces';
import { mockUsers } from '../../../__mocks__';
import { act } from 'react-dom/test-utils';
import * as Api from '../../../__mocks__/mockAPI';

let testUser: UserInterface;

function setUser(user: UserInterface): void {
  testUser = user;
}

const testProps = {
  handleLogIn: setUser,
};
let renderedComponent: ReactWrapper;

beforeEach(() => {
  renderedComponent = mount(<SignInPage {...testProps}></SignInPage>);
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('Log In Page', () => {
  it('Renders email input', () => {
    expect(renderedComponent.html()).toContain('Enter email');
  });

  it('Renders Password input', () => {
    expect(renderedComponent.text()).toContain('Password');
  });

  it('Renders the email when input is typed in', () => {
    const input = renderedComponent.find({ type: 'email' }).first();
    expect(input).toBeDefined();
    input.simulate('change', { target: { value: 'foo' } });
    expect(renderedComponent.html()).toContain('foo');
  });

  it('Renders the password when input is typed in', () => {
    const input = renderedComponent.find({ type: 'password' }).first();
    expect(input).toBeDefined();
    input.simulate('change', { target: { value: 'foo' } });
    expect(renderedComponent.html()).toContain('foo');
  });

  it('shows an error if the username and password do not exist', async () => {
    jest.spyOn(Api, 'login').mockResolvedValue(undefined);
    const passwordInput = renderedComponent.find({ type: 'password' }).first();
    const emailInput = renderedComponent.find({ type: 'email' }).first();
    emailInput.simulate('change', { target: { value: 'testEmail@test.com' } });
    passwordInput.simulate('change', { target: { value: 'testPass' } });

    await act(async () => {
      renderedComponent.find({ type: 'submit' }).first().simulate('submit');
    });
    expect(renderedComponent.text()).toContain('Invalid Email or Password');
  });

  it('calls handleLogin with the user if the email and password exist', async () => {
    jest.spyOn(Api, 'login').mockResolvedValue(mockUsers[0]);
    const passwordInput = renderedComponent.find({ type: 'password' }).first();
    const emailInput = renderedComponent.find({ type: 'email' }).first();
    emailInput.simulate('change', { target: { value: 'testEmail@test.com' } });
    passwordInput.simulate('change', { target: { value: 'testPass' } });

    await act(async () => {
      renderedComponent.find({ type: 'submit' }).first().simulate('submit');
    });
    expect(renderedComponent.text()).not.toContain('Invalid Email or Password');
    expect(testUser).toEqual(mockUsers[0]);
  });
});
