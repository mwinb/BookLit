import CommentInputForm, { CommentInputFormProps } from './CommentInput';
import { mockTopics } from '../../../../../__mocks__/mockTopics';
import { API, mockUsers } from '../../../../../__mocks__';
import { CommentInterface, ANON_USER } from '../../../../../common/interfaces';
import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { Button } from 'react-bootstrap';
import { act } from '@testing-library/react';

let comments: CommentInterface[] | undefined = [];
let commentRepo: CommentInterface[] | undefined = [];
let renderedComponent: ReactWrapper;

const testProps: CommentInputFormProps = {
  topic: mockTopics[0],
  user: mockUsers[0],
  api: API.getInstance(),
  updateComments: (comms: CommentInterface[] | undefined) => (comments = comms),
};

beforeEach(() => {
  comments = [];
  commentRepo = [];
  jest.spyOn(API.prototype, 'getCommentsByTopic').mockResolvedValue(commentRepo);
  jest.spyOn(API.prototype, 'addComment').mockImplementation(
    async (comment: CommentInterface): Promise<string | undefined> => {
      if (commentRepo) {
        commentRepo.push(comment);
      }
      return comment.id;
    },
  );
  renderedComponent = mount(<CommentInputForm {...testProps}></CommentInputForm>);
});

describe('Comment Input Form', () => {
  const addTextToTextArea = async () => {
    const textArea = renderedComponent.find('textarea').first();
    await act(async () => {
      textArea.simulate('change', { target: { value: 'test text' } });
    });
  };

  const clickSubmit = async () => {
    const submit = renderedComponent.find(Button).first();
    await act(async () => {
      submit.simulate('submit');
    });
  };

  it('Renders a submit button', () => {
    const button = renderedComponent.find(Button).first();
    expect(button).toBeDefined();
    expect(button.text()).toContain('Submit');
  });

  it('updates text are text when user types ', async () => {
    await addTextToTextArea();
    expect(renderedComponent.html()).toContain('test text');
  });

  it('submits the comment when the submit button is clicked', async () => {
    await addTextToTextArea();
    await clickSubmit();
    expect(comments).toBeDefined();
  });

  it('sets user to anon if the topic is private', async () => {
    testProps.topic.public = false;
    renderedComponent = mount(<CommentInputForm {...testProps}></CommentInputForm>);
    await addTextToTextArea();
    await clickSubmit();
    expect(comments).toBeDefined();
    if (comments) {
      expect(comments.length).toBe(1);
      expect(comments[0].user).toBe(ANON_USER);
    }
  });
});
