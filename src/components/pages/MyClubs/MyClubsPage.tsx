import React, { ReactElement, useEffect, useCallback, useState } from 'react';
import { UserInterface, ClubInterface } from '../../../common/interfaces';
import { API } from '../../../__mocks__';
import ClubCard from './ClubCard/ClubCard';
import { CardDeck } from 'react-bootstrap';
import PageWrapper from '../../../common/components/PageWrapper/PageWrapper';

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
    <PageWrapper shadeStyle={{ textAlign: 'center', overflow: 'scroll' }}>
      <CardDeck>
        {clubs &&
          clubs.map((club, index) => {
            return <ClubCard key={`ClubCard: ${club.id}:${index}`} club={club} />;
          })}
      </CardDeck>
    </PageWrapper>
  );
}

export default MyClubsPage;
