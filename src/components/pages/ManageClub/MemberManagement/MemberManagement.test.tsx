import MemberManagement, { MemberManagementProps } from './MemberManagement';
import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { mockClubs, mockUsers } from '../../../../__mocks__';
import * as API from '../../../../common/API/APICalls';
import { act } from '@testing-library/react';
import { SUCCESS_REQUEST } from '../../../../common/API';
import { ERRORS } from '../../../../common/errors';
import { UserInterface } from '../../../../common/interfaces';

const clubOwner = mockUsers[1];
let testProps: MemberManagementProps = {
  clubId: mockClubs[0].id,
  clubOwner: clubOwner.id,
};
let members: UserInterface[];
let renderedComponent: ReactWrapper;
let getUsersByClubIdSpy: jest.SpyInstance<any, any>;
let removeUserFromClubByIdSpy: jest.SpyInstance<any, any>;

beforeEach(() => {
  members = [...mockUsers];
  getUsersByClubIdSpy = jest.spyOn(API, 'getUsersByClubId').mockResolvedValue(members);
  removeUserFromClubByIdSpy = jest.spyOn(API, 'removeUserFromClub').mockResolvedValue(SUCCESS_REQUEST);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('<UserManagement />', () => {
  beforeEach(async () => {
    await act(async () => {
      renderedComponent = mount(<MemberManagement {...testProps} />);
    });
    renderedComponent.update();
  });

  afterEach(() => {
    renderedComponent.unmount();
  });

  it('retrieves users upon mounting, given the club', () => {
    expect(getUsersByClubIdSpy).toHaveBeenCalledTimes(1);
  });

  it('displays the user names after retrieving members', () => {
    expect(renderedComponent.text()).toContain(mockUsers[0].username);
  });

  it('it displays a remove button for the member', () => {
    const removeButton = renderedComponent.find('.removeUserButton').first();
    expect(removeButton.text()).toContain('Remove');
  });

  it('does not display the club owner', () => {
    expect(renderedComponent.text()).not.toContain(clubOwner.username);
  });
});

describe('<UserManagement /> API Failed Responses', () => {
  beforeEach(async () => {
    getUsersByClubIdSpy.mockResolvedValue(undefined);
    await act(async () => {
      renderedComponent = mount(<MemberManagement {...testProps} />);
    });
    renderedComponent.update();
  });

  afterEach(async () => {
    renderedComponent.unmount();
  });

  it('does not set members if it fails to retrieve users by id', () => {
    expect(getUsersByClubIdSpy).toHaveBeenCalledTimes(1);
    expect(renderedComponent.text()).not.toContain(mockUsers[0].username);
  });
});

describe('<UserManagement /> Remove Member', () => {
  beforeEach(async () => {
    await act(async () => {
      renderedComponent = mount(<MemberManagement {...testProps} />);
    });
    renderedComponent.update();
    await act(async () => {
      renderedComponent.find('.removeUserButton').first().simulate('click');
    });
    renderedComponent.update();
  });

  afterEach(() => {
    renderedComponent.unmount();
  });

  it('removes a user after remove button is clicked', () => {
    expect(renderedComponent.text()).not.toContain(mockUsers[0].username);
  });

  it('calls removeUserFromClubById when remove button is clicked', () => {
    expect(removeUserFromClubByIdSpy).toHaveBeenCalledTimes(1);
  });
});

describe('<UserManagement /> Remove Member Failure Cases', () => {
  beforeEach(async () => {
    removeUserFromClubByIdSpy.mockResolvedValue(ERRORS.REMOVE_USER);
    await act(async () => {
      renderedComponent = mount(<MemberManagement {...testProps} />);
    });
    renderedComponent.update();
    await act(async () => {
      renderedComponent.find('.removeUserButton').first().simulate('click');
    });
    renderedComponent.update();
  });

  it(`should display ${ERRORS.REMOVE_USER} error if it fails to remove user from club`, () => {
    expect(renderedComponent.text()).toContain(ERRORS.REMOVE_USER);
  });
});
