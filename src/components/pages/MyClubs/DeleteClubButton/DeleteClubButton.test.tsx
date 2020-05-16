import DeleteClubButton, { DeleteClubButtonProps } from './DeleteClubButton';
import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import * as ConfirmationModal from '../../../ConfirmationModal/ConfirmationModal';
import { MockConfirmationModal } from '../../../../__mocks__/components/MockConfirmationModal';
import * as RedirectWrapper from '../../../RedirectWrapper/RedirectWrapper';
import { MockRedirectWrapper } from '../../../../__mocks__/components/MockRedirectWrapper';
import { mockClubs, mockUsers } from '../../../../__mocks__';
import * as API from '../../../../__mocks__/mockAPI';
import { act } from 'react-dom/test-utils';
import { ERRORS } from '../../../../common/errors';
import { DEFAULT_USER_CONTEXT } from '../../../../common/context/UserContext';
import { spyUseUser } from '../../../../__mocks__/mockUserContext';

let renderedComponent: ReactWrapper;
let deleteClubSpy: jest.SpyInstance<Promise<string | undefined>>;
let mockUserContext = DEFAULT_USER_CONTEXT;

const testProps: DeleteClubButtonProps = {
  clubId: mockClubs[0].id,
};

beforeEach(() => {
  mockUserContext.user = mockUsers[0];
  jest.spyOn(RedirectWrapper, 'default').mockImplementation(MockRedirectWrapper);
  deleteClubSpy = jest.spyOn(API, 'deleteClub').mockResolvedValue(mockClubs[0].id);
  jest.spyOn(ConfirmationModal, 'default').mockImplementation(MockConfirmationModal);
  spyUseUser(mockUserContext);
  renderedComponent = mount(<DeleteClubButton {...testProps} />);
});

afterEach(() => {
  renderedComponent.unmount();
  jest.restoreAllMocks();
});

describe('<DeleteClubButton>', () => {
  it('renders a delete button', () => {
    expect(renderedComponent.text()).toContain('Delete');
  });

  it('requests confirmation on click', () => {
    renderedComponent.find('#deleteClubButton').first().simulate('click');
    expect(renderedComponent.text()).toContain('Confirmation Modal');
  });
});

describe('ConfirmationModal is Showing', () => {
  beforeEach(() => {
    renderedComponent.find('#deleteClubButton').first().simulate('click');
  });

  it('makes deleteClub api call when confirm is clicked', () => {
    renderedComponent.find('#confirmModalButton').first().simulate('click');
    expect(deleteClubSpy).toHaveBeenCalled();
  });

  it('closes the confirmation modal if no error', async () => {
    await act(async () => {
      renderedComponent.find('#confirmModalButton').first().simulate('click');
    });
    renderedComponent.update();
    expect(renderedComponent.text()).not.toContain('Confirmation Modal');
  });

  it('removes the club from the users clubs', async () => {
    await act(async () => {
      renderedComponent.find('#confirmModalButton').first().simulate('click');
    });
    expect(mockUserContext.user.clubs.find((club) => club === mockClubs[0].id)).not.toBeDefined();
  });

  it(`displays ${ERRORS.UNKNOWN} inside modal if it fails to delete`, async () => {
    deleteClubSpy.mockResolvedValue(undefined);
    await act(async () => {
      renderedComponent.find('#confirmModalButton').first().simulate('click');
    });
    renderedComponent.update();
    expect(renderedComponent.text()).toContain(ERRORS.UNKNOWN);
  });

  it('closes the modal if the cancel button is clicked', () => {
    renderedComponent.find('#cancelModalButton').first().simulate('click');
    expect(renderedComponent.text()).not.toContain('Confirmation Modal');
  });
});
