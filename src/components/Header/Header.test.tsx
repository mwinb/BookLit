import { mount, ReactWrapper } from 'enzyme';
import Header from './Header';
import React from 'react';

let renderedComponent: ReactWrapper;

const props = {
  isLoggedIn: false,
  userName: 'Test User',
};

afterEach(() => {
  renderedComponent.unmount();
  jest.restoreAllMocks();
});

describe('Header when user is not logged in', () => {
  beforeEach(() => {
    renderedComponent = mount(<Header {...props}></Header>);
  });

  it('renders a nav bar', () => {
    expect(renderedComponent.find('NavBar').first()).toBeDefined();
  });

  it('renders a nav bar with website title', () => {
    expect(renderedComponent.text()).toContain('Book Nook');
  });

  it('renders a sign in link when the user is not logged in', () => {
    expect(renderedComponent.text()).toContain('Sign In');
  });
});

describe('Header when user is logged in', () => {
  beforeEach(async () => {
    props.isLoggedIn = true;
    renderedComponent = mount(<Header {...props}></Header>);
    renderedComponent.find('.dropdown-toggle').first().simulate('click');
  });

  it('renders a sign out link with the user is logged in', () => {
    expect(renderedComponent.text()).toContain('Sign Out');
  });

  it('renders a link for the users clubs', () => {
    expect(renderedComponent.text()).toContain('My Clubs');
  });

  it('renders a link to create a new club', () => {
    expect(renderedComponent.text()).toContain('New Club');
  });

  it('renders a link for user to adjust thier settings', () => {
    expect(renderedComponent.text()).toContain('My Settings');
  });
});
