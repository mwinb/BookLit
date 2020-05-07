import { ReactWrapper, mount } from 'enzyme';
import * as Router from 'react-router-dom';
import React from 'react';
import ClubPage, { ClubPageProps } from './ClubPage';
import { Routes } from '../../../common/Routes';
import { mockClubs, mockUsers } from '../../../__mocks__';
import { act } from '@testing-library/react';
import * as TopicBoard from './ClubTopicBoard/TopicBoard';
import * as TopicSwitcher from './TopicsSwitcher/TopicSwitcher';
import * as DeleteTopicButton from './ClubTopicBoard/DeleteTopic/DeleteTopicButton';
import { Button } from 'react-bootstrap';
let renderedComponent: ReactWrapper;

const testProps: ClubPageProps = {
  user: mockUsers[0],
};

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

beforeEach(async () => {
  jest.spyOn(TopicBoard, 'default').mockReturnValue(<div>Topic Board</div>);
  jest.spyOn(TopicSwitcher, 'default').mockImplementation((props) => {
    return (
      <Button id="switchTopic" onClick={() => props.setCurrentTopic(mockClubs[0].topics[1])}>
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

  it('does not show delete button if current topic is the clubs general chat', () => {
    expect(renderedComponent.text()).not.toContain('Delete Topic');
  });

  it('shows delete button if current topic not equal to clubs general chat', async () => {
    await act(async () => {
      renderedComponent.find('#switchTopic').first().simulate('click');
    });
    expect(renderedComponent.text()).toContain('Delete Topic');
  });
});
