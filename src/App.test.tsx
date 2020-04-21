import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import * as MyClubsPage from './components/pages/MyClubs/MyClubsPage';

beforeEach(() => {
  jest.spyOn(MyClubsPage, 'default').mockReturnValue(<div>My Clubs</div>);
});

it('renders app', () => {
  const renderedComponent = mount(<App></App>);
  expect(renderedComponent.html()).toContain('Book Nook');
});
