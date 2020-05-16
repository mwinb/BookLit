import ClubCard, {
  MIN_CARD_WIDTH,
  WINDOW_SIZE_CUT_OFF,
  MAX_CARD_WIDTH,
  getMaxCardWidth,
  ClubCardProps,
} from './ClubCard';
import * as Api from '../../../../__mocks__/mockAPI';
import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { mockUsers, mockClubs } from '../../../../__mocks__';
import DeleteClubButton from '../DeleteClubButton/DeleteClubButton';

let renderedComponent: ReactWrapper;

let testProps: ClubCardProps = {
  club: mockClubs[0],
  owned: false,
};

beforeEach(() => {
  jest.spyOn(Api, 'getUserById').mockResolvedValue(mockUsers[0]);
});

describe('Club Card', () => {
  beforeEach(async () => {
    await act(async () => {
      renderedComponent = mount(
        <BrowserRouter>
          <ClubCard {...testProps}></ClubCard>
        </BrowserRouter>,
      );
    });
  });

  it('renders club card with club name', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].name);
  });

  it('renders club card with book name', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].book);
  });

  it('renders Club card with the number of members', () => {
    expect(renderedComponent.text()).toContain(mockClubs[0].members.length);
  });

  it('retrieves the club owners user name', () => {
    expect(renderedComponent.text()).toContain(mockUsers[0].username);
  });

  it('shows the date created in the club card', () => {
    const expectedDate = new Date(mockClubs[0].created).toDateString();
    expect(renderedComponent.text()).toContain(expectedDate);
  });
});

describe('ownedClub', () => {
  beforeEach(async () => {
    testProps.owned = true;
    await act(async () => {
      renderedComponent = mount(
        <BrowserRouter>
          <ClubCard {...testProps}></ClubCard>
        </BrowserRouter>,
      );
    });
  });

  it('renders <DeleteClubButton />', () => {
    const deleteClubButton = renderedComponent.find(DeleteClubButton).first();
    expect(deleteClubButton.text()).toBe('Delete');
  });
});

describe('getMaxCardWidth', () => {
  it(`returns ${MAX_CARD_WIDTH} if windowWidth is less than ${WINDOW_SIZE_CUT_OFF}`, () => {
    const maxCardWidth = getMaxCardWidth(WINDOW_SIZE_CUT_OFF - 1);
    expect(maxCardWidth).toBe(MAX_CARD_WIDTH);
  });

  it(`return ${MIN_CARD_WIDTH} if windowWidth is greater than or equal to ${WINDOW_SIZE_CUT_OFF}`, () => {
    const maxCardWidth = getMaxCardWidth(WINDOW_SIZE_CUT_OFF);
    expect(maxCardWidth).toBe(MIN_CARD_WIDTH);
  });
});
