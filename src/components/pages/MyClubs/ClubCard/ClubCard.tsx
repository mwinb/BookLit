import { ClubInterface } from '../../../../common/interfaces';
import React, { ReactElement, useEffect, useState, useCallback, FunctionComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Routes } from '../../../../common/Routes';
import { getUserById } from '../../../../__mocks__';
import DeleteClubButton from '../DeleteClubButton/DeleteClubButton';

export const MIN_CARD_WIDTH = 70;
export const MAX_CARD_WIDTH = 90;
export const WINDOW_SIZE_CUT_OFF = 800;
export const getMaxCardWidth = (windowWidth: number) =>
  windowWidth < WINDOW_SIZE_CUT_OFF ? MAX_CARD_WIDTH : MIN_CARD_WIDTH;
export interface ClubCardProps {
  club: ClubInterface;
  owned: boolean;
}

const ClubCard: FunctionComponent<ClubCardProps> = (props): ReactElement => {
  const [clubCreator, setClubCreator] = useState<string>();
  const [minCardWidth] = useState<number>(getMaxCardWidth(window.innerWidth));

  const retrieveClubOwner = useCallback(
    async (clubOwnerId) => {
      const clubOwner = await getUserById(clubOwnerId);
      setClubCreator(clubOwner?.username);
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
          Created: {new Date(props.club.created).toDateString()}
        </small>
      </Card.Body>
      <Card.Footer>
        <LinkContainer to={{ pathname: Routes.CLUB, state: { club: props.club } }}>
          <Button variant="outline-primary" className="text-light">
            Open
          </Button>
        </LinkContainer>
        {props.owned && <DeleteClubButton clubId={props.club.id} />}
      </Card.Footer>
    </Card>
  );
};

export default ClubCard;
