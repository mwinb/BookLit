import { ReactWrapper, mount, shallow } from 'enzyme';
import TopicSwitcher, { TopicSwitcherProps } from './TopicSwitcher';
import { mockTopics } from '../../../../__mocks__/mockTopics';
import { mockClubs, API } from '../../../../__mocks__';
import { TopicInterface } from '../../../../common/interfaces';
import { act } from '@testing-library/react';
import React from 'react';

let renderedComponent: ReactWrapper;
let testTopicId: string;
let getTopicsByClubSpy: jest.SpyInstance<Promise<TopicInterface[] | undefined>>;

const testProps: TopicSwitcherProps = {
  currentTopicId: mockTopics[0].id,
  clubId: mockClubs[0].id,
  setCurrentTopic: (topicId: string) => (testTopicId = topicId),
  api: API.getInstance(),
};

beforeEach(async () => {
  jest.spyOn(API.prototype, 'getTopicById').mockResolvedValue(mockTopics[0]);
  getTopicsByClubSpy = jest.spyOn(API.prototype, 'getTopicsByClub').mockResolvedValue([mockTopics[0]]);
  await act(async () => {
    renderedComponent = mount(<TopicSwitcher {...testProps}></TopicSwitcher>);
  });
  await act(async () => {
    renderedComponent.find({ role: 'button' }).first().simulate('click');
  });
});

describe('Topic Switcher', () => {
  it('Displays list of topics', () => {
    expect(renderedComponent.text()).toContain(mockTopics[0].name);
  });

  it('retrieves the topic from the current topic id', () => {
    expect(testTopicId).toEqual(mockTopics[0].id);
  });

  it('retrieves all topics from clubId', () => {
    expect(getTopicsByClubSpy).toHaveBeenCalled();
  });
});
