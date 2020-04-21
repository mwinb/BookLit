import { ReactWrapper, mount } from 'enzyme';
import { UserInterface, DEFAULT_USER } from '../../../common/interfaces';
import NewClubPage, { NewClubPageProps } from './NewClub';
import { mockUsers, API, mockClubs } from '../../../__mocks__';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

let renderedComponent: ReactWrapper;
let createClubSpy: jest.SpyInstance<Promise<string | undefined>>;
let testUser: UserInterface;
let mockSetUserFunction = (user: UserInterface) => (testUser = user);
let TestProps: NewClubPageProps = {
  setUser: mockSetUserFunction,
  user: mockUsers[0],
  api: API.getInstance(),
};

let clubNameInput: ReactWrapper;
let clubDescriptionInput: ReactWrapper;
let clubBookNameInput: ReactWrapper;
let submitButton: ReactWrapper;

beforeEach(() => {
  jest.spyOn(API.prototype, 'updateUser').mockResolvedValue(mockUsers[0].id);
  createClubSpy = jest.spyOn(API.prototype, 'createClub').mockResolvedValue(`${mockClubs.length + 1}`);
  testUser = DEFAULT_USER;
  renderedComponent = mount(
    <BrowserRouter>
      <NewClubPage {...TestProps} />
    </BrowserRouter>,
  );
  clubNameInput = renderedComponent.find('#clubNameInput').first();
  clubDescriptionInput = renderedComponent.find('#clubDescriptionInput').first();
  clubBookNameInput = renderedComponent.find('#bookNameInput').first();
  submitButton = renderedComponent.find({ type: 'submit' }).first();
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('New Club Page Inputs', () => {
  describe('Set up', () => {
    it('has a club name input', () => {
      expect(clubNameInput).toBeDefined();
    });

    it('has a club description input', () => {
      expect(clubDescriptionInput).toBeDefined();
    });

    it('has a club book name input', () => {
      expect(clubBookNameInput).toBeDefined();
    });

    it('has a submit button', () => {
      expect(submitButton).toBeDefined();
    });
  });

  describe('Required Fields', () => {
    it('Requires a club name', () => {
      const props: any = clubNameInput.props();
      expect(JSON.stringify(props.required)).toBe('true');
    });
  });

  describe('adds a new club', () => {
    beforeEach(async () => {
      clubNameInput.simulate('change', { target: { value: 'New Club Name' } });
      clubBookNameInput.simulate('change', { target: { value: 'New Book To Read' } });
      clubDescriptionInput.simulate('change', { target: { value: 'Very descriptive description' } });
      await act(async () => {
        submitButton.simulate('submit');
      });
    });

    it('creates a new club', async () => {
      expect(createClubSpy).toHaveBeenCalled();
    });

    it('Updates the user with the new id when a new club is added', async () => {
      expect(JSON.stringify(testUser)).not.toEqual(JSON.stringify(DEFAULT_USER));
    });
  });

  describe('Failing to add club', () => {
    beforeEach(async () => {
      createClubSpy.mockResolvedValue(undefined);
      await act(async () => {
        submitButton.simulate('submit');
      });
    });

    it('shows error if it fails to add club', () => {
      expect(createClubSpy).toHaveBeenCalled();
      expect(testUser).toBe(DEFAULT_USER);
    });
  });
});
