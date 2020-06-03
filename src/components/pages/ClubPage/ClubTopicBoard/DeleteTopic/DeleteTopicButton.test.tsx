import DeleteTopicButton, { DeleteTopicButtonProps } from './DeleteTopicButton';
import { mockClubs, mockTopics } from '../../../../../__mocks__';
import { ClubInterface } from '../../../../../common/interfaces';
import { ReactWrapper, mount } from 'enzyme';
import * as ConfirmationModal from '../../../../ConfirmationModal/ConfirmationModal';
import * as Api from '../../../../../common/API/APICalls';

import React from 'react';
import { act } from 'react-dom/test-utils';
import { ERRORS } from '../../../../../common/errors';
import { MockConfirmationModal } from '../../../../../__mocks__/components/MockConfirmationModal';

let testClub: ClubInterface;
let testCurrentTopic: string;
let renderedComponent: ReactWrapper;

const testDeleteTopicButtonProps: DeleteTopicButtonProps = {
  topicId: mockTopics[0].id,
  club: mockClubs[0],
  handleUpdateClub: (club: ClubInterface) => (testClub = { ...club }),
  handleUpdateCurrentTopic: (topicId: string) => (testCurrentTopic = topicId),
};

beforeEach(() => {
  testClub = mockClubs[0];
  testCurrentTopic = testDeleteTopicButtonProps.topicId;
  jest.spyOn(ConfirmationModal, 'default').mockImplementation(MockConfirmationModal);
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('<DeleteTopicButton>', () => {
  beforeEach(() => {
    renderedComponent = mount(<DeleteTopicButton {...testDeleteTopicButtonProps} />);
  });
  it('renders delete Topic Button', () => {
    expect(renderedComponent.text()).toContain('Delete');
  });

  it('defaults to not showing the modal', () => {
    expect(renderedComponent.text()).not.toContain('Cancel');
  });

  it('sets modal showing to true', () => {
    renderedComponent.find('#showConfirmationModal').first().simulate('click');
    expect(renderedComponent.text()).toContain('Cancel');
  });

  it('sets modal showing to false', () => {
    renderedComponent.find('#showConfirmationModal').first().simulate('click');
    renderedComponent.find('#cancelModalButton').first().simulate('click');
    expect(renderedComponent.text()).not.toContain('Cancel');
  });

  describe('handleConfirmed()', () => {
    let deleteTopicSpy: jest.SpyInstance<any>;
    beforeEach(() => {
      deleteTopicSpy = jest.spyOn(Api, 'deleteTopic').mockResolvedValue(true);
      renderedComponent = mount(<DeleteTopicButton {...testDeleteTopicButtonProps} />);
      renderedComponent.find('#showConfirmationModal').first().simulate('click');
    });

    it('deletes topic from club when the modal confirm button is clicked', async () => {
      await act(async () => {
        renderedComponent.find('#confirmModalButton').first().simulate('click');
      });
      expect(deleteTopicSpy).toHaveBeenCalled();
      expect(testCurrentTopic).toBe(mockClubs[0].generalChat);
    });

    it(`shows ${ERRORS.UNKNOWN} error if it fails to delete topic`, async () => {
      deleteTopicSpy.mockResolvedValue(false);
      await act(async () => {
        renderedComponent.find('#confirmModalButton').first().simulate('click');
      });
      renderedComponent.update();
      expect(renderedComponent.html()).toContain(ERRORS.UNKNOWN);
    });
  });
});
