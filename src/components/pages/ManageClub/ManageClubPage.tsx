import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import ClubSettingsSwitcher from './ClubSettingsSwitcher/ClubSettingsSwitcher';
import { Navbar } from 'react-bootstrap';
import RequestManagement from './RequestManagement/RequestManagement';
import { UserInterface, ClubInterface, DEFAULT_CLUB } from '../../../common/interfaces';
import { useLocation } from 'react-router-dom';
import RedirectWrapper from '../../RedirectWrapper/RedirectWrapper';
import { Routes } from '../../../common/Routes';
import { clubSettings } from './ClubSettings';
import MemberManagement from './MemberManagement/MemberManagement';

export interface ManageClubPageProps {
  user: UserInterface;
}

export interface ManageClubPageLocationState {
  club: ClubInterface;
}

const ManageClubPage: FunctionComponent<ManageClubPageProps> = (_props): ReactElement => {
  const [currentSetting, setCurrentSetting] = useState<string>(clubSettings.requests);
  const [club, setClub] = useState<ClubInterface>(DEFAULT_CLUB);
  const locationState = useLocation().state as ManageClubPageLocationState;

  useEffect(() => {
    if (locationState) {
      setClub(locationState.club);
    }
  }, [locationState, setClub]);

  return !locationState ? (
    <RedirectWrapper to={Routes.HOME} />
  ) : (
    <>
      <div className="pt-2 d-flex justify-content-center w-100" style={{ backgroundColor: 'rgb(0,0,0,.3)' }}>
        <h1>Manage Club</h1>
      </div>
      <Navbar
        id="manageClubNavBar"
        variant="dark"
        className="pt-4 justify-content-center w-100"
        style={{ width: '100%' }}
      >
        <ClubSettingsSwitcher currentSelection={currentSetting} setCurrentSelection={setCurrentSetting} />
      </Navbar>
      {currentSetting === clubSettings.requests && <RequestManagement clubId={club.id} />}
      {currentSetting === clubSettings.members && <MemberManagement clubId={club.id} clubOwner={club.owner} />}
    </>
  );
};

export default ManageClubPage;
