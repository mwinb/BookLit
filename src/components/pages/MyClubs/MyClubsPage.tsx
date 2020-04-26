import React, { ReactElement, useEffect, useCallback, useState } from 'react';
import { UserInterface, ClubInterface } from '../../../common/interfaces';
import { API } from '../../../__mocks__';
import ClubCard from './ClubCard/ClubCard';
import { CardDeck } from 'react-bootstrap';

export interface MyClubsPageProps {
  user: UserInterface;
  api: API;
}
function MyClubsPage(props: MyClubsPageProps): ReactElement {
  const [clubs, setClubs] = useState<ClubInterface[]>();

  const getClubs = useCallback(
    async (clubs) => {
      const clubsInterfaces = await props.api.getClubsByIds(clubs);
      setClubs(clubsInterfaces);
    },
    [props.api],
  );

  useEffect(() => {
    getClubs(props.user.clubs);
  }, [props.user.clubs, getClubs]);

  return (
    <div className="container overflow-scroll" style={{ width: '100%', height: '95%', overflowY: 'scroll' }}>
      <CardDeck>
        {clubs &&
          clubs.map((club, index) => {
            return <ClubCard key={`ClubCard: ${club.id}:${index}`} club={club} />;
          })}
      </CardDeck>
    </div>
  );
}

export default MyClubsPage;
