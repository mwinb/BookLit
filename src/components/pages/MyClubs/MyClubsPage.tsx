import React, { ReactElement, useEffect, useCallback, useState } from 'react';
import { UserInterface, ClubInterface } from '../../../common/interfaces';
import ClubCard from './ClubCard/ClubCard';
import { CardDeck } from 'react-bootstrap';
import { getClubsByIds } from '../../../__mocks__';

export interface MyClubsPageProps {
  user: UserInterface;
}

function MyClubsPage(props: MyClubsPageProps): ReactElement {
  const [clubs, setClubs] = useState<ClubInterface[]>();

  const getClubs = useCallback(async (clubs) => {
    const allClubs = await getClubsByIds(clubs);
    setClubs(allClubs);
  }, []);

  useEffect(() => {
    getClubs(props.user.clubs);
  }, [props.user.clubs, getClubs]);

  return (
    <div className="container overflow-scroll" style={{ width: '100%', height: '95%', overflowY: 'scroll' }}>
      <CardDeck>
        {clubs &&
          clubs.map((club, index) => {
            return <ClubCard key={`ClubCard: ${club.id}:${index}`} club={club} owned={club.owner === props.user.id} />;
          })}
      </CardDeck>
    </div>
  );
}

export default MyClubsPage;
