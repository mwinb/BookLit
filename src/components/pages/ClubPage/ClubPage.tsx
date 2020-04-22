import PageWrapper from '../../../common/components/PageWrapper/PageWrapper';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation, Redirect } from 'react-router-dom';
import { ClubInterface, UserInterface } from '../../../common/interfaces';
import { Routes } from '../../../common/Routes';

export interface ClubPageProps {
  user: UserInterface;
}

const ClubPage: FunctionComponent<ClubPageProps> = (props) => {
  const [club, setClub] = useState<ClubInterface>();
  const [user] = useState<UserInterface>(props.user);
  const locationState = useLocation().state as any;

  useEffect(() => {
    if (locationState) {
      setClub(locationState.club);
    }
  }, [locationState, setClub]);

  return !locationState ? (
    <Redirect to={Routes.HOME} />
  ) : (
    <PageWrapper>
      <Card
        bg="dark"
        text="white"
        border="success"
        style={{
          maxWidth: 'max-content',
          minWidth: '70%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2%',
          marginBottom: '2%',
          minHeight: '90%',
          textAlign: 'left',
        }}
      >
        <Card.Header style={{ fontWeight: 'bold' }}>
          <h4>{club?.name}</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title>Book: {club?.book}</Card.Title>
        </Card.Body>
        <input style={{ width: '80%', minHeight: '10%', margin: '2%' }} type="text"></input>
        <Card.Footer>{user.name}</Card.Footer>
      </Card>
    </PageWrapper>
  );
};

export default ClubPage;
