import { ClubInterface } from '../../../../common/interfaces';
import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Routes } from '../../../../common/Routes';
import { API } from '../../../../__mocks__';

const MIN_CARD_WIDTH = 70;
const MAX_CARD_WIDTH = 90;
const WINDOW_SIZE_CUT_OFF = 800;
export interface ClubCardProps {
  club: ClubInterface;
}
function ClubCard(props: ClubCardProps): ReactElement {
  const [clubCreator, setClubCreator] = useState<string>();
  const [minCardWidth] = useState<number>(window.innerWidth < WINDOW_SIZE_CUT_OFF ? MAX_CARD_WIDTH : MIN_CARD_WIDTH);

  const retrieveClubOwner = useCallback(
    async (clubOwnerId) => {
      const clubOwner = await API.getInstance().getUserById(clubOwnerId);
      setClubCreator(clubOwner?.name);
    },
    [setClubCreator],
  );

  useEffect(() => {
    retrieveClubOwner(props.club.owner);
  }, [retrieveClubOwner, props.club.owner]);

  return (
    <Card
      bg="dark"
      text="white"
      border="success"
      style={{
        maxWidth: 'max-content',
        minWidth: `${minCardWidth}%`,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        marginBottom: '2%',
        textAlign: 'left',
      }}
    >
      <Card.Header style={{ fontWeight: 'bold' }}>
        <h4>{props.club.name}</h4>
      </Card.Header>
      <Card.Body>
        <Card.Title>Book {props.club.book}</Card.Title>
        <p color="white" style={{ margin: '0', padding: '0' }}>
          Description:
        </p>
        <p>{props.club.description}</p>
        <br />
        <small color="white" style={{ margin: '0', padding: '0' }}>
          Owner: {clubCreator}
        </small>
        <br />
        <small color="white" style={{ margin: '0', padding: '0' }}>
          Members: {props.club.members.length}
        </small>
        <br />
        <small color="white" style={{ margin: '0', padding: '0' }}>
          Topics: {props.club.topics.length}
        </small>
        <br />
        <small color="white" style={{ margin: '0', padding: '0' }}>
          Created: {new Date(props.club.created).toDateString()}
        </small>
      </Card.Body>
      <Card.Footer>
        <LinkContainer to={{ pathname: Routes.CLUB, state: { club: props.club } }}>
          <Button variant="success">Open</Button>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
}

export default ClubCard;
