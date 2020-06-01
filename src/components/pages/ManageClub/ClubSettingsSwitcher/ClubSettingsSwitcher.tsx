import { FunctionComponent, ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';
import React from 'react';
import './ClubSettingsSwitcher.css';
import { clubSettings } from '../ManageClubPage';

export interface ClubSettingsSwitcherProps {
  currentSelection: string;
  setCurrentSelection(selection: string): void;
}

const ClubSettingsSwitcher: FunctionComponent<ClubSettingsSwitcherProps> = (props): ReactElement => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="manageClub-dropdown" className="p-2 w-100 text-light">
          {props.currentSelection}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            id={`${clubSettings.requests}Button`}
            eventKey={clubSettings.requests}
            onClick={() => props.setCurrentSelection(clubSettings.requests)}
          >
            {clubSettings.requests}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ClubSettingsSwitcher;
