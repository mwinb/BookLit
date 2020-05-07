import DeleteTopicButton, { DeleteTopicButtonProps } from './DeleteTopicButton';
import { mockClubs } from '../../../../../__mocks__';
import { ClubInterface } from '../../../../../common/interfaces';
import { ReactWrapper, mount } from 'enzyme';
import * as ConfirmationModal from './ConfirmationModal';
import * as Api from '../../../../../__mocks__/mockAPI';

import React from 'react';
import { Button } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import { ERRORS } from '../../../../../common/errors';

let testClub: ClubInterface;
let testCurrentTopic: string;
let renderedComponent: ReactWrapper;

const testDeleteTopicButtonProps: DeleteTopicButtonProps = {
  topicId: mockClubs[0].topics[1],
  club: mockClubs[0],
  handleUpdateClub: (club: ClubInterface) => (testClub = { ...club }),
  handleUpdateCurrentTopic: (topicId: string) => (testCurrentTopic = topicId),
};

beforeEach(() => {
  testClub = mockClubs[0];
  testCurrentTopic = testDeleteTopicButtonProps.topicId;
  jest.spyOn(ConfirmationModal, 'default').mockImplementation((props) => {
    return (
      <>
        {props.show && (
          <>
            {props.alert}
            <Button id="cancelModalButton" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button id="confirmModalButton" onClick={props.handleConfirm}>
              Confirm
            </Button>
          </>
        )}
      </>
    );
  });
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
      expect(mockClubs[0].topics.length).toBeGreaterThan(testClub.topics.length);
      expect(testCurrentTopic).toBe(mockClubs[0].generalChat);
    });

    it(`shows ${ERRORS.UNKNOWN} error if it fails to delete topic`, async () => {
      deleteTopicSpy.mockResolvedValue(false);
      await act(async () => {
        renderedComponent.find('#confirmModalButton').first().simulate('click');
      });
      renderedComponent.update();
      expect(renderedComponent.html()).toContain(ERRORS.UNKNOWN);
      expect(mockClubs[0].topics.length).toEqual(testClub.topics.length);
    });
  });
});