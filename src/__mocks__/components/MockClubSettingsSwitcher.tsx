import { ClubSettingsSwitcherProps } from '../../components/pages/ManageClub/ClubSettingsSwitcher/ClubSettingsSwitcher';
import React from 'react';
import { Button } from 'react-bootstrap';
import { clubSettings } from '../../components/pages/ManageClub/ClubSettings';

export function MockClubSettingsSwitcher(props: ClubSettingsSwitcherProps) {
  return (
    <>
      <div>{props.currentSelection}</div>
      {Object.entries(clubSettings).map((setting, index) => {
        return (
          <Button
            key={`${index}${setting[1]}Button`}
            id={`${setting[1]}Button`}
            onClick={() => props.setCurrentSelection(setting[1])}
          >
            {setting[1]}Button
          </Button>
        );
      })}
    </>
  );
}
