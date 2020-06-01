import { MockRedirectWrapper } from '../../../__mocks__/components/MockRedirectWrapper';
import * as DeleteTopicButton from './ClubTopicBoard/DeleteTopic/DeleteTopicButton';
import * as RedirectWrapper from '../../RedirectWrapper/RedirectWrapper';
import { mockClubs, mockUsers, mockTopics } from '../../../__mocks__';
import * as TopicSwitcher from './TopicsSwitcher/TopicSwitcher';
import * as TopicBoard from './ClubTopicBoard/TopicBoard';
import ClubPage, { ClubPageProps } from './ClubPage';
import { Routes } from '../../../common/Routes';
import { ReactWrapper, mount } from 'enzyme';
import { act } from '@testing-library/react';
import * as Router from 'react-router-dom';
import { Button } from 'react-bootstrap';
import React from 'react';

let renderedComponent: ReactWrapper;
const clubOwner = mockUsers[0];
const clubUser = mockUsers[1];

let testProps: ClubPageProps;

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

beforeEach(() => {
  testProps = {
    user: clubOwner,
  };
  jest.spyOn(TopicBoard, 'default').mockReturnValue(<div>Topic Board</div>);
  jest.spyOn(RedirectWrapper, 'default').mockImplementation(MockRedirectWrapper);
  jest.spyOn(TopicSwitcher, 'default').mockImplementation((props) => {
    return (
      <Button id="switchTopic" onClick={() => props.setCurrentTopic(mockTopics[1].id)}>
        Topic Switcher
      </Button>
    );
  });
  jest.spyOn(DeleteTopicButton, 'default').mockReturnValue(<div>Delete Topic Button</div>);
  jest.spyOn(Router, 'useLocation').mockReturnValue({
    pathname: `${Routes.CLUB}/${mockClubs[0].name}`,
    state: { club: mockClubs[0] },
    search: '',
    hash: '',
  });
});

afterEach(() => {
  renderedComponent.unmount();
  jest.restoreAllMocks();
});

describe('Club Page', () => {
  beforeEach(async () => {
    await act(async () => {
      renderedComponent = mount(<ClubPage {...testProps} />);
    });
  });
  it('uses location to retrieve club from MyClubs page', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].name);
  });

  it('does not show delete button if current topic is the clubs general chat', () => {
    expect(renderedComponent.text()).not.toContain('Delete Topic');
  });

  it('does not show delete topic if not the club owner', async () => {
    testProps.user = clubUser;
    await act(async () => {
      renderedComponent = mount(<ClubPage {...testProps} />);
    });
    await act(async () => {
      renderedComponent.find('#switchTopic').first().simulate('click');
    });
    expect(renderedComponent.text()).not.toContain('Delete Topic');
  });

  it('shows delete button if current topic not equal to clubs general chat', async () => {
    await act(async () => {
      renderedComponent.find('#switchTopic').first().simulate('click');
    });
    expect(renderedComponent.text()).toContain('Delete Topic');
  });
});

describe('Redirect', () => {
  beforeEach(async () => {
    jest.spyOn(Router, 'useLocation').mockReturnValue({
      pathname: `${Routes.CLUB}/${mockClubs[0].name}`,
      state: undefined,
      search: '',
      hash: '',
    });
    await act(async () => {
      renderedComponent = mount(<ClubPage {...testProps} />);
    });
  });

  it(`Redirects to ${Routes.HOME} if location state is undefined`, () => {
    expect(renderedComponent.text()).toContain(Routes.HOME);
  });
});
