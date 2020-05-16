import React, { useState, FunctionComponent, ReactElement, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { TopicInterface, CommentInterface, UserInterface } from '../../../../common/interfaces';
import Colors from '../../../../common/Styles/Colors';
import './TopicBoard.css';
import CommentInputForm from './SubmitCommentForm/CommentInput';
import { getTopicById, getCommentsByTopic } from '../../../../__mocks__';

export interface TopicBoardProps {
  topicId: string;

  user: UserInterface;
}

export const TopicBoard: FunctionComponent<TopicBoardProps> = (props): ReactElement => {
  const [topic, setTopic] = useState<TopicInterface>();
  const [comments, setComments] = useState<CommentInterface[]>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTopicById(props.topicId).then(setTopic);
    getCommentsByTopic(props.topicId).then(setComments);
  }, [props.topicId]);

  useEffect(() => {
    if (ref.current !== null) ref.current.scrollIntoView({ behavior: 'auto' });
  }, [comments]);

  return (
    <Card
      bg="dark"
      text="white"
      style={{
        maxWidth: 'max-content',
        minWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '95%',
        textAlign: 'center',
      }}
    >
      <Card.Header style={{ fontWeight: 'bold', width: '100%' }}>
        <h5>{topic?.name}</h5>
      </Card.Header>
      <Card.Text>{topic?.description}</Card.Text>
      <Card.Body style={{ height: '90%', width: '99%', overflowY: 'scroll', textAlign: 'left' }}>
        {comments?.map((comment, index) => {
          return (
            <div key={`${comment.id}:${index}`} className="row">
              <span className="pr-2" style={{ maxWidth: '20%' }}>
                {comment.user}:
              </span>
              <div
                style={{ width: '75%', textAlign: 'left', backgroundColor: Colors.SHADOW_BACKGROUND }}
                className="mb-3 p-2"
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
