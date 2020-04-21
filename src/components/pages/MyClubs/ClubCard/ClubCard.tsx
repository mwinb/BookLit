import { ClubInterface } from '../../../../common/interfaces';
import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from '../../../../common/Routes';
import { API } from '../../../../__mocks__';

export interface ClubCardProps {
  club: ClubInterface;
}
function ClubCard(props: ClubCardProps): ReactElement {
  const [clubCreator, setClubCreator] = useState<string>();

  const retrieveClubOwner = useCallback(
    async (clubOwnerId) => {
      const clubOwner = await API.getInstance().getUser(clubOwnerId);
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
        minWidth: '70%',
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
      </Card.Body>
      <Card.Footer style={{ textAlign: 'right' }}>
        <LinkContainer to={`${Routes.CLUB}/${props.club.id}`}>
          <Button variant="success">Open</Button>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
}

export default ClubCard;
