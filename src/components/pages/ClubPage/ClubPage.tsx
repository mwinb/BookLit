import React, { FunctionComponent, useState, useEffect } from 'react';
import { Card, Navbar } from 'react-bootstrap';
import { useLocation, Redirect } from 'react-router-dom';
import { ClubInterface, UserInterface, DEFAULT_CLUB, DEFAULT_TOPIC } from '../../../common/interfaces';
import { Routes } from '../../../common/Routes';
import TopicSwitcher from './TopicsSwitcher/TopicSwitcher';
import { API } from '../../../__mocks__';
import TopicBoard from './ClubTopicBoard/TopicBoard';

export interface ClubPageProps {
  user: UserInterface;
  api: API;
}

const ClubPage: FunctionComponent<ClubPageProps> = (props) => {
  const [club, setClub] = useState<ClubInterface>(DEFAULT_CLUB);
  const [currentTopicId, setCurrentTopicId] = useState<string>(DEFAULT_TOPIC.id);
  const locationState = useLocation().state as any;
  const api = props.api;
  const user = props.user;

  useEffect(() => {
    if (locationState) {
      setClub(locationState.club);
      setCurrentTopicId(locationState.club.generalChat);
    }
  }, [locationState, setClub, setCurrentTopicId]);

  return !locationState ? (
    <Redirect to={Routes.HOME} />
  ) : (
    <Card
      bg="dark"
      text="white"
      border="primary"
      style={{
        maxWidth: 'max-content',
        minWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '93%',
        textAlign: 'left',
      }}
    >
      <Card.Header style={{ fontWeight: 'bold', width: '100%' }}>{club.name}</Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <Navbar
          bg="dark"
          variant="dark"
          className="border-primary p-0"
          style={{ border: 'solid', borderWidth: 1, width: '100%' }}
        >
          <TopicSwitcher
            clubId={club.id}
            setCurrentTopic={setCurrentTopicId}
            currentTopicId={currentTopicId}
            api={api}
          ></TopicSwitcher>
        </Navbar>
        <TopicBoard api={api} user={user} topicId={currentTopicId}></TopicBoard>
      </Card.Body>
    </Card>
  );
};

export default ClubPage;
