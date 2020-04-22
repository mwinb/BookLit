import { ReactWrapper, mount } from 'enzyme';
import * as Router from 'react-router-dom';
import React from 'react';
import ClubPage, { ClubPageProps } from './ClubPage';
import { Routes } from '../../../common/Routes';
import { mockClubs, mockUsers } from '../../../__mocks__';
let renderedComponent: ReactWrapper;

const testProps: ClubPageProps = {
  user: mockUsers[0],
};

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(Router, 'useLocation').mockReturnValue({
    pathname: `${Routes.CLUB}/${mockClubs[0].name}`,
    state: { club: mockClubs[0] },
    search: '',
    hash: '',
  });
  renderedComponent = mount(<ClubPage {...testProps} />);
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('Club Page', () => {
  it('uses location to retrieve club from MyClubs page', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].name);
  });
});
