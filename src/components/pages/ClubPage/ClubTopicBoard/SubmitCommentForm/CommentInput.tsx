import React, { ReactElement, FunctionComponent, useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  DEFAULT_COMMENT,
  ANON_USER,
  CommentInterface,
  TopicInterface,
  UserInterface,
} from '../../../../../common/interfaces';
import { getCommentsByTopic, addComment } from '../../../../../__mocks__';

export interface CommentInputFormProps {
  topic: TopicInterface;
  user: UserInterface;

  updateComments(comments: CommentInterface[] | undefined): void;
}

const CommentInputForm: FunctionComponent<CommentInputFormProps> = (props): ReactElement => {
  const [textInput, setTextInput] = useState<string>('');
  const topic = props.topic;
  const user = props.user;
  const setComments = props.updateComments;

  const submitComment = useCallback(
    async (event: any) => {
      event.preventDefault();
      const message = { ...DEFAULT_COMMENT, message: textInput };
      message.user = topic.public ? user.name : ANON_USER;
      message.topic = topic.id;
      await addComment(message);
      setComments(await getCommentsByTopic(topic.id));
      setTextInput('');
    },
    [textInput, setComments, topic, user.name],
  );

  const updateTextInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => setTextInput(event.target.value),
    [setTextInput],
  );

  return (
    <Form onSubmit={submitComment} className="row align-row-center mb-4" style={{ height: '10%' }}>
      <textarea
        value={textInput}
        placeholder="Comment..."
        minLength={1}
        maxLength={300}
        onChange={updateTextInput}
        className="textAreaNoResize bg-dark text-white border-primary mt-1 ml-auto"
        style={{ width: '50%' }}
        required
      ></textarea>
      <Button variant="outline-primary" className="mt-1 mr-auto" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CommentInputForm;
