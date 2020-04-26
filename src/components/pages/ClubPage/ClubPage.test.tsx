import { ReactWrapper, mount } from 'enzyme';
import * as Router from 'react-router-dom';
import React from 'react';
import ClubPage, { ClubPageProps } from './ClubPage';
import { Routes } from '../../../common/Routes';
import { mockClubs, mockUsers, API } from '../../../__mocks__';
import { act } from '@testing-library/react';
import * as TopicBoard from './ClubTopicBoard/TopicBoard';
import * as TopicSwitcher from './TopicsSwitcher/TopicSwitcher';
let renderedComponent: ReactWrapper;

const testProps: ClubPageProps = {
  user: mockUsers[0],
  api: API.getInstance(),
};

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

beforeEach(async () => {
  jest.spyOn(TopicBoard, 'default').mockReturnValue(<div>Topic Board</div>);
  jest.spyOn(TopicSwitcher, 'default').mockReturnValue(<div>Topic Switcher</div>);
  jest.spyOn(Router, 'useLocation').mockReturnValue({
    pathname: `${Routes.CLUB}/${mockClubs[0].name}`,
    state: { club: mockClubs[0] },
    search: '',
    hash: '',
  });
  await act(async () => {
    renderedComponent = mount(<ClubPage {...testProps} />);
  });
});

afterEach(() => {
  renderedComponent.unmount();
  jest.restoreAllMocks();
});

describe('Club Page', () => {
  it('uses location to retrieve club from MyClubs page', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].name);
  });
});
