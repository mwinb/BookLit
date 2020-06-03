import React from 'react';
import ManageClubPage, { ManageClubPageProps } from './ManageClubPage';
import { ReactWrapper, mount } from 'enzyme';
import * as ClubSettingSwitcher from './ClubSettingsSwitcher/ClubSettingsSwitcher';
import { MockClubSettingsSwitcher } from '../../../__mocks__/components/MockClubSettingsSwitcher';
import * as ManageRequests from './RequestManagement/RequestManagement';
import { act } from 'react-dom/test-utils';
import { mockUsers, mockClubs } from '../../../__mocks__';
import * as Router from 'react-router-dom';
import { Routes } from '../../../common/Routes';
import * as RedirectWrapper from '../../RedirectWrapper/RedirectWrapper';
import { MockRedirectWrapper } from '../../../__mocks__/components/MockRedirectWrapper';
import { clubSettings } from './ClubSettings';
import * as MemberManagement from './MemberManagement/MemberManagement';

let renderedComponent: ReactWrapper;

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

const testProps: ManageClubPageProps = {
  user: mockUsers[0],
};

beforeEach(() => {
  jest.spyOn(ClubSettingSwitcher, 'default').mockImplementation(MockClubSettingsSwitcher);
  jest.spyOn(ManageRequests, 'default').mockReturnValue(<div>{ManageRequests.REQUEST_MANAGEMENT_TITLE}</div>);
  jest.spyOn(MemberManagement, 'default').mockReturnValue(<div>{clubSettings.members}</div>);
  jest.spyOn(RedirectWrapper, 'default').mockImplementation(MockRedirectWrapper);
  jest.spyOn(Router, 'useLocation').mockReturnValue({
    pathname: `${Routes.MANAGE_CLUB}/${mockClubs[0].name}`,
    state: { club: mockClubs[0] },
    search: '',
    hash: '',
  });
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('<ManageClubPage />', () => {
  beforeEach(async () => {
    await act(async () => {
      renderedComponent = mount(<ManageClubPage {...testProps} />);
    });
  });

  it('displays Manage Club Page', () => {
    expect(renderedComponent.text()).toContain(clubSettings.requests);
  });

  it('should contain a nav bar', () => {
    const navBar = renderedComponent.find('#manageClubNavBar').first();
    expect(navBar.html()).toBeDefined();
  });

  it('should contain Manage Requests page when Requests is selected', async () => {
    await act(async () => {
      renderedComponent.find('#RequestsButton').first().simulate('click');
    });
    expect(renderedComponent.text()).toContain(ManageRequests.REQUEST_MANAGEMENT_TITLE);
  });

  it('should contain Manage Users page when Members is selected', async () => {
    await act(async () => {
      renderedComponent.find('#MembersButton').first().simulate('click');
      expect(renderedComponent.text()).toContain(clubSettings.members);
    });
  });
});

describe('Redirect', () => {
  beforeEach(async () => {
    jest.spyOn(Router, 'useLocation').mockReturnValue({
      pathname: `${Routes.MANAGE_CLUB}/${mockClubs[0].name}`,
      state: undefined,
      search: '',
      hash: '',
    });
    await act(async () => {
      renderedComponent = mount(<ManageClubPage {...testProps} />);
    });
  });

  it(`Redirects to ${Routes.HOME} if location state is undefined`, () => {
    expect(renderedComponent.text()).toContain(Routes.HOME);
  });
});
