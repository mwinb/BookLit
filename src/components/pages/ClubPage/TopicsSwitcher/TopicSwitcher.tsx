import { TopicInterface } from '../../../../common/interfaces';
import React, { FunctionComponent, useEffect, useCallback, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import './TopicSwitcher.css';
import { getTopicsByClub, getTopicById } from '../../../../common/API';

export interface TopicSwitcherProps {
  currentTopicId: string;
  clubId: string;
  setCurrentTopic(topicId: string): void;
}

const TopicSwitcher: FunctionComponent<TopicSwitcherProps> = (props) => {
  const [allTopics, setAllTopics] = useState<TopicInterface[]>();
  const setCurrentTopicId = props.setCurrentTopic;

  const retrieveTopicFromId = useCallback(
    async (topicId: string) => {
      const topic = await getTopicById(topicId);
      if (topic) {
        setCurrentTopicId(topic.id);
      }
    },
    [setCurrentTopicId],
  );

  const retrieveAllTopicsFromClubId = useCallback(
    async (clubId: string) => {
      const topics = await getTopicsByClub(clubId);
      setAllTopics(topics);
    },
    [setAllTopics],
  );

  useEffect(() => {
    retrieveTopicFromId(props.currentTopicId);
    retrieveAllTopicsFromClubId(props.clubId);
  }, [props.clubId, props.currentTopicId, retrieveAllTopicsFromClubId, retrieveTopicFromId]);

  return (
    <Nav activeKey={props.currentTopicId}>
      <NavDropdown title={'Topics'} id="topic-dropdown" className="ml-2 btn btn-outline-primary text-light">
        {allTopics &&
          allTopics.map((topic, index) => {
            return (
              <NavDropdown.Item
                key={`${topic.name}: ${index}`}
                eventKey={topic.id}
                id={`topicDropdown-${topic.id}`}
                onClick={() => retrieveTopicFromId(topic.id)}
              >
                {topic.name}
              </NavDropdown.Item>
            );
          })}
      </NavDropdown>
    </Nav>
  );
};

export default TopicSwitcher;
