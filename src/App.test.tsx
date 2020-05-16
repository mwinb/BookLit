import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import * as MyClubsPage from './components/pages/MyClubs/MyClubsPage';
import { spyUseUser } from './__mocks__/mockUserContext';
import { DEFAULT_USER_CONTEXT } from './common/context/UserContext';

const mockUserContext = DEFAULT_USER_CONTEXT;

beforeEach(() => {
  jest.spyOn(MyClubsPage, 'default').mockReturnValue(<div>My Clubs</div>);
  spyUseUser(mockUserContext);
});

it('renders app', () => {
  const renderedComponent = mount(<App></App>);
  expect(renderedComponent.html()).toContain('Book Nook');
});
