import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import MyClubsPage from './MyClubsPage';
import { UserInterface } from '../../../common/interfaces';
import { API, mockUsers, mockClubs } from '../../../__mocks__';
import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

let renderedComponent: ReactWrapper;
let user: UserInterface;
let api = API.getInstance();

beforeEach(async () => {
  user = mockUsers[0];
  jest.spyOn(API.prototype, 'getClubsByIds').mockResolvedValue([mockClubs[0]]);
  await act(async () => {
    renderedComponent = mount(
      <BrowserRouter>
        <MyClubsPage user={user} api={api}></MyClubsPage>
      </BrowserRouter>,
    );
  });
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('My Club Page', () => {
  it('Renders My Clubs', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].name);
  });
});
