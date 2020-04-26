import { FunctionComponent, ReactElement, useCallback, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import { TopicInterface, CommentInterface, UserInterface } from '../../../../common/interfaces';
import { API } from '../../../../__mocks__';
import Colors from '../../../../common/Styles/Colors';
import './TopicBoard.css';
import CommentInputForm from './SubmitCommentForm/CommentInput';

export interface TopicBoardProps {
  topicId: string;
  api: API;
  user: UserInterface;
}

export const TopicBoard: FunctionComponent<TopicBoardProps> = (props): ReactElement => {
  const [topic, setTopic] = useState<TopicInterface>();
  const [comments, setComments] = useState<CommentInterface[]>();
  const ref = useRef<HTMLDivElement>(null);

  const retrieveTopic = useCallback(
    async (topicId) => {
      const topic = await props.api.getTopicById(topicId);
      setTopic(topic);
    },
    [setTopic, props.api],
  );

  const retrieveComments = useCallback(
    async (topicId) => {
      const comments = await props.api.getCommentsByTopic(topicId);
      setComments(comments);
    },
    [setComments, props.api],
  );

  useEffect(() => {
    retrieveTopic(props.topicId);
    retrieveComments(props.topicId);
  }, [retrieveTopic, retrieveComments, props.topicId]);

  useEffect(() => {
    if (ref.current !== null) ref.current.scrollIntoView({ behavior: 'auto' });
  }, [comments]);

  return (
    <Card
      bg="dark"
      text="white"
      border="primary"
      style={{
        maxWidth: 'max-content',
        minWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '95%',
        textAlign: 'center',
      }}
    >
      <Card.Header style={{ fontWeight: 'bold', width: '100%' }}>{topic?.name}</Card.Header>
      <Card.Text>{topic?.description}</Card.Text>
      <Card.Body style={{ height: '90%', width: '99%', overflowY: 'scroll', textAlign: 'left' }}>
        {comments?.map((comment, index) => {
          const borderColor = index % 2 ? 'border-success' : 'border-primary';
          return (
            <div key={`${comment.id}:${index}`} className="row">
              <span className="pr-2" style={{ maxWidth: '20%' }}>
                {comment.user}:
              </span>
              <div
                style={{ width: '75%', textAlign: 'left', backgroundColor: Colors.SHADOW_BACKGROUND }}
                className={`${borderColor} mb-3 p-2`}
              >
                <span>{comment.message}</span>
                <br></br>
                <span className="mt-2 text-primary">Posted: {new Date(comment.created).toLocaleString()}</span>
              </div>
            </div>
          );
        })}
        <div ref={ref}></div>
      </Card.Body>
      {topic && <CommentInputForm {...props} topic={topic} updateComments={setComments}></CommentInputForm>}
    </Card>
  );
};

export default TopicBoard;
