import React, { ReactElement, useEffect, useCallback, useState } from 'react';
import { UserInterface, ClubInterface } from '../../../common/interfaces';
import { API } from '../../../__mocks__';
import ClubCard from './ClubCard/ClubCard';
import { CardDeck } from 'react-bootstrap';
import Colors from '../../../common/Styles/Colors';

export interface MyClubsPageProps {
  user: UserInterface;
  api: API;
}
function MyClubsPage(props: MyClubsPageProps): ReactElement {
  const [clubs, setClubs] = useState<ClubInterface[]>();

  const getClubs = useCallback(
    async (clubs) => {
      const clubsInterfaces = await props.api.getClubs(clubs);
      setClubs(clubsInterfaces);
    },
    [props.api],
  );

  useEffect(() => {
    getClubs(props.user.clubs);
  }, [props.user.clubs, getClubs]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: Colors.BACKGROUND, minHeight: '100vh', padding: '2%' }}>
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
