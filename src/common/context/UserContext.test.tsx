import { ReactWrapper, mount } from 'enzyme';
import React, { ReactElement } from 'react';
import UserProvider, { useUser, DEFAULT_USER_CONTEXT } from './UserContext';
import { mockUsers } from '../../__mocks__';
import { DEFAULT_USER } from '../interfaces';

let renderedComponent: ReactWrapper;

const MockConsumer = (_props: any): ReactElement => {
  const { user, setUser } = useUser();

  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
      <button id="updateUserButton" onClick={() => setUser(mockUsers[0])}>
        update user
      </button>
    </div>
  );
};

beforeEach(() => {
  renderedComponent = mount(
    <UserProvider>
      <MockConsumer />
    </UserProvider>,
  );
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('UserContext', () => {
  it(`it initializes user as DEFAULT_USER`, () => {
    expect(renderedComponent.text()).toContain(JSON.stringify(DEFAULT_USER));
  });

  it('updates state when setUser is called with a new UserInterface', () => {
    renderedComponent.find('#updateUserButton').first().simulate('click');
    renderedComponent.update();
    expect(renderedComponent.text()).toContain(JSON.stringify(mockUsers[0]));
  });
});

describe('DEFAULT_USER_CONTEXT', () => {
  it(`it initializes user as DEFAULT_USER`, () => {
    expect(DEFAULT_USER_CONTEXT.user).toBe(DEFAULT_USER);
  });

  it('sets user to new user', () => {
    DEFAULT_USER_CONTEXT.setUser(mockUsers[0]);
    expect(DEFAULT_USER_CONTEXT.user).toBe(mockUsers[0]);
  });
});
