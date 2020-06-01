import React, { FunctionComponent, useState, useEffect } from 'react';
import { Card, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ClubInterface, UserInterface, DEFAULT_CLUB, DEFAULT_TOPIC } from '../../../common/interfaces';
import { Routes } from '../../../common/Routes';
import TopicSwitcher from './TopicsSwitcher/TopicSwitcher';
import TopicBoard from './ClubTopicBoard/TopicBoard';
import NewTopicButton from './ClubTopicBoard/NewTopic/NewTopicButton';
import DeleteTopicButton from './ClubTopicBoard/DeleteTopic/DeleteTopicButton';
import RedirectWrapper from '../../RedirectWrapper/RedirectWrapper';

export interface ClubPageProps {
  user: UserInterface;
}

export interface ClubPageLocationState {
  club: ClubInterface;
}

const ClubPage: FunctionComponent<ClubPageProps> = (props) => {
  const [club, setClub] = useState<ClubInterface>(DEFAULT_CLUB);
  const [currentTopicId, setCurrentTopicId] = useState<string>(DEFAULT_TOPIC.id);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const locationState = useLocation().state as ClubPageLocationState;
  const user = props.user;

  useEffect(() => {
    if (locationState) {
      setClub(locationState.club);
      setCurrentTopicId(locationState.club.generalChat);
      setIsOwner(locationState.club.owner === user.id);
    }
  }, [locationState, setClub, setCurrentTopicId, user.id]);

  return !locationState ? (
    <RedirectWrapper to={Routes.HOME} />
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
      <Card.Header style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
        <h4>{club.name}</h4>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <Navbar bg="dark" variant="dark" className="p-0" style={{ width: '100%' }}>
          <TopicSwitcher
            clubId={club.id}
            setCurrentTopic={setCurrentTopicId}
            currentTopicId={currentTopicId}
          ></TopicSwitcher>
          <div className="d-flex justify-content-between w-100 mr-1">
            <NewTopicButton clubId={club.id} updateTopic={setCurrentTopicId}></NewTopicButton>
            {currentTopicId !== club.generalChat && isOwner && (
              <DeleteTopicButton
                club={club}
                topicId={currentTopicId}
                handleUpdateClub={setClub}
                handleUpdateCurrentTopic={setCurrentTopicId}
              />
            )}
          </div>
        </Navbar>
        <TopicBoard user={user} topicId={currentTopicId}></TopicBoard>
      </Card.Body>
    </Card>
  );
};

export default ClubPage;
