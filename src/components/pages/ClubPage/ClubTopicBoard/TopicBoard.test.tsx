import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import TopicBoard, { TopicBoardProps } from './TopicBoard';
import { mockTopics } from '../../../../__mocks__/mockTopics';
import { API, mockUsers } from '../../../../__mocks__';
import { act } from '@testing-library/react';
import { TopicInterface, CommentInterface } from '../../../../common/interfaces';
import { mockComments } from '../../../../__mocks__/mockComments';

let renderedComponent: ReactWrapper;
let getTopicByIdSpy: jest.SpyInstance<Promise<TopicInterface | undefined>>;
let getCommentsByTopicSpy: jest.SpyInstance<Promise<CommentInterface[] | undefined>>;

const testProps: TopicBoardProps = {
  topicId: mockTopics[0].id,
  api: API.getInstance(),
  user: mockUsers[0],
};

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

beforeEach(async () => {
  getTopicByIdSpy = jest.spyOn(API.prototype, 'getTopicById').mockResolvedValue(mockTopics[0]);
  getCommentsByTopicSpy = jest.spyOn(API.prototype, 'getCommentsByTopic').mockResolvedValue([mockComments[0]]);
  jest.spyOn(React, 'useRef').mockReturnValue({ current: { scrollIntoView: scrollIntoViewMock } });
  await act(async () => {
    renderedComponent = mount(<TopicBoard {...testProps}></TopicBoard>);
  });
});

describe('Topic Board', () => {
  describe('Component Mounts', () => {
    it('retrives the topic for the id recieved from props', () => {
      expect(getTopicByIdSpy).toHaveBeenCalled();
    });

    it('retrives the comments for the given topic id', () => {
      expect(getCommentsByTopicSpy).toHaveBeenCalled();
    });

    it('sets the title to the topics name', () => {
      expect(renderedComponent.text()).toContain(mockTopics[0].name);
    });
  });
});
