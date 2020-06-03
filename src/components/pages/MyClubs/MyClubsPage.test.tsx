import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import MyClubsPage from './MyClubsPage';
import { UserInterface } from '../../../common/interfaces';
import { mockUsers, mockClubs } from '../../../__mocks__';
import * as Api from '../../../common/API/APICalls';
import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as ClubCard from './ClubCard/ClubCard';

let renderedComponent: ReactWrapper;
let user: UserInterface;

beforeEach(async () => {
  user = mockUsers[0];
  jest.spyOn(Api, 'getClubsByIds').mockResolvedValue([mockClubs[0]]);
  jest.spyOn(ClubCard, 'default').mockImplementation((props) => {
    return (
      <div>
        {props.club.id}:{props.club.name}
      </div>
    );
  });
  await act(async () => {
    renderedComponent = mount(
      <BrowserRouter>
        <MyClubsPage user={user}></MyClubsPage>
      </BrowserRouter>,
    );
  });
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('My Club Page', () => {
  it('Renders My Clubs', () => {
    expect(renderedComponent.text()).toBeDefined();
    expect(renderedComponent.text()).toContain(mockClubs[0].name);
  });
});
