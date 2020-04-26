import { TopicInterface } from '../../../../common/interfaces';
import React, { FunctionComponent, useEffect, useCallback, useState } from 'react';
import { API } from '../../../../__mocks__';
import { Nav, NavDropdown } from 'react-bootstrap';
import './TopicSwitcher.css';

export interface TopicSwitcherProps {
  currentTopicId: string;
  clubId: string;
  setCurrentTopic(topicId: string): void;
  api: API;
}

const TopicSwitcher: FunctionComponent<TopicSwitcherProps> = (props) => {
  const [allTopics, setAllTopics] = useState<TopicInterface[]>();
  const setCurrentTopicId = props.setCurrentTopic;

  const retrieveTopicFromId = useCallback(
    async (topicId: string) => {
      const topic = await props.api.getTopicById(topicId);
      if (topic) {
        setCurrentTopicId(topic.id);
      }
    },
    [setCurrentTopicId, props.api],
  );

  const retrieveAllTopicsFromClubId = useCallback(
    async (clubId: string) => {
      const topics = await props.api.getTopicsByClub(clubId);
      setAllTopics(topics);
    },
    [props.api, setAllTopics],
  );

  useEffect(() => {
    retrieveTopicFromId(props.currentTopicId);
    retrieveAllTopicsFromClubId(props.clubId);
  }, [props.clubId, props.currentTopicId, retrieveAllTopicsFromClubId, retrieveTopicFromId]);

  return (
    <Nav activeKey={props.currentTopicId}>
      <NavDropdown title={'Topics'} id="topic-dropdown">
        {allTopics &&
          allTopics.map((topic, index) => {
            return (
              <NavDropdown.Item
                key={`${topic.name}: ${index}`}
                eventKey={topic.id}
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
