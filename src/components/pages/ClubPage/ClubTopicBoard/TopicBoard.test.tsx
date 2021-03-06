import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import TopicBoard, { TopicBoardProps } from './TopicBoard';
import { mockUsers, mockTopics } from '../../../../__mocks__';
import * as Api from '../../../../common/API/APICalls';
import { act } from '@testing-library/react';
import { TopicInterface, CommentInterface } from '../../../../common/interfaces';
import { mockComments } from '../../../../__mocks__/mockComments';

let renderedComponent: ReactWrapper;
let getTopicByIdSpy: jest.SpyInstance<Promise<TopicInterface | undefined>>;
let getCommentsByTopicSpy: jest.SpyInstance<Promise<CommentInterface[] | undefined>>;
let scrollIntoViewMock: jest.Mock<any, any>;

const testProps: TopicBoardProps = {
  topicId: mockTopics[0].id,
  user: mockUsers[0],
};

beforeEach(async () => {
  scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  jest.spyOn(window.HTMLElement.prototype, 'scrollIntoView').mockImplementation;
  getTopicByIdSpy = jest.spyOn(Api, 'getTopicById').mockResolvedValue(mockTopics[0]);
  getCommentsByTopicSpy = jest.spyOn(Api, 'getCommentsByTopic').mockResolvedValue([mockComments[0]]);
  jest.spyOn(React, 'useRef').mockReturnValue({ current: { scrollIntoView: scrollIntoViewMock } });
  await act(async () => {
    renderedComponent = mount(<TopicBoard {...testProps}></TopicBoard>);
  });
});

afterEach(() => {
  renderedComponent.unmount();
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

    it('scrolls into view', () => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });
});
