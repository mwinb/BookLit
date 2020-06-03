import { FunctionComponent, ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';
import React from 'react';
import './ClubSettingsSwitcher.css';
import { clubSettings } from '../ClubSettings';

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
          {Object.entries(clubSettings).map((setting, index) => {
            return (
              <Dropdown.Item
                key={`${setting[1]}:${index}`}
                id={`${setting[1]}Button`}
                eventKey={setting[1]}
                onClick={() => props.setCurrentSelection(setting[1])}
              >
                {setting[1]}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ClubSettingsSwitcher;
