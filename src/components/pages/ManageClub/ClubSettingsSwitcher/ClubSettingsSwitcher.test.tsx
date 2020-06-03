import ClubSettingsSwitcher, { ClubSettingsSwitcherProps } from './ClubSettingsSwitcher';
import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { clubSettings } from '../ClubSettings';
import { act } from 'react-dom/test-utils';

let renderedComponent: ReactWrapper;
let currentSelection: string;

const testProps: ClubSettingsSwitcherProps = {
  currentSelection: clubSettings.requests,
  setCurrentSelection: (selection: string) => (currentSelection = selection),
};

beforeEach(() => {
  currentSelection = '';
  renderedComponent = mount(<ClubSettingsSwitcher {...testProps} />);
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('<ClubSettingsSwitcher />', () => {
  it('renders the club settings switcher with the current selection as title', () => {
    expect(renderedComponent.text()).toContain(clubSettings.requests);
  });

  it('shows dropdown items on click', async () => {
    await act(async () => {
      renderedComponent.find('#manageClub-dropdown').first().simulate('click');
    });
    expect(renderedComponent.text()).toContain(clubSettings.requests);
  });

  it('updates the current selection', async () => {
    await act(async () => {
      renderedComponent.find('#manageClub-dropdown').first().simulate('click');
    });
    renderedComponent.update();
    await act(async () => {
      renderedComponent.find(`#${clubSettings.requests}Button`).first().simulate('click');
    });
    expect(currentSelection).toBe(clubSettings.requests);
  });
});
