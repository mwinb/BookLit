import { ReactWrapper, mount } from 'enzyme';
import TopicSwitcher, { TopicSwitcherProps } from './TopicSwitcher';
import { mockClubs, mockTopics } from '../../../../__mocks__';
import * as Api from '../../../../__mocks__/mockAPI';
import { TopicInterface } from '../../../../common/interfaces';
import { act } from '@testing-library/react';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';

let renderedComponent: ReactWrapper;
let testTopicId: string;
let getTopicsByClubSpy: jest.SpyInstance<Promise<TopicInterface[] | undefined>>;
let getTopicByIdSpy: jest.SpyInstance<any>;

const testProps: TopicSwitcherProps = {
  currentTopicId: mockTopics[0].id,
  clubId: mockClubs[0].id,
  setCurrentTopic: (topicId: string) => (testTopicId = topicId),
};

beforeEach(async () => {
  getTopicByIdSpy = jest.spyOn(Api, 'getTopicById').mockResolvedValue(mockTopics[0]);
  getTopicsByClubSpy = jest.spyOn(Api, 'getTopicsByClub').mockResolvedValue([mockTopics[0]]);
  await act(async () => {
    renderedComponent = mount(<TopicSwitcher {...testProps}></TopicSwitcher>);
  });
  await act(async () => {
    renderedComponent.find({ role: 'button' }).first().simulate('click');
  });
});

afterEach(() => {
  jest.restoreAllMocks();
  renderedComponent.unmount();
});

describe('Topic Switcher', () => {
  it('Displays list of topics', () => {
    expect(renderedComponent.text()).toContain(mockTopics[0].name);
  });

  it('retrieves the topic from the current topic id', () => {
    expect(testTopicId).toEqual(mockTopics[0].id);
  });

  it('retrieves all topics from clubId', () => {
    expect(getTopicsByClubSpy).toHaveBeenCalledTimes(1);
  });
});
