import { NewTopicButtonProps, NewTopicModalProps, NewTopicModal } from './NewTopicModal';
import { mockClubs } from '../../../../../__mocks__';
import * as Api from '../../../../../__mocks__/mockAPI';
import { mockTopics } from '../../../../../__mocks__/mockTopics';
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from '@testing-library/react';
import { DEFAULT_TOPIC, TopicInterface } from '../../../../../common/interfaces';
import { ERRORS } from '../../../../../common/errors';

let renderedComponent: ReactWrapper;
let topicDescriptionInput: ReactWrapper;
let topicNameInput: ReactWrapper;
let topicPublicSwitch: ReactWrapper;
let submitButton: ReactWrapper;

let addTopicSpy: jest.SpyInstance<any>;

let topicId: string;
let isShown: boolean;
let newTopic: TopicInterface;

const testNewTopicButtonProps: NewTopicButtonProps = {
  clubId: mockClubs[0].id,
  updateTopic: (newTopicId: string) => (topicId = newTopicId),
};

const testNewTopicModalProps: NewTopicModalProps = {
  ...testNewTopicButtonProps,
  show: true,
  onHide: () => (isShown = false),
};

describe('<NewTopicModal>', () => {
  newTopic = DEFAULT_TOPIC;
  beforeEach(() => {
    addTopicSpy = jest.spyOn(Api, 'addTopic').mockImplementation(async (topic: TopicInterface) => {
      newTopic = topic;
      return `${mockTopics.length + 1}`;
    });
    renderedComponent = mount(<NewTopicModal {...testNewTopicModalProps}></NewTopicModal>);
    topicDescriptionInput = renderedComponent.find('#topicDescriptionInput').first();
    topicNameInput = renderedComponent.find('#topicNameInput').first();
    topicPublicSwitch = renderedComponent.find('#topicPublicSwitch').first();
    submitButton = renderedComponent.find('#newTopicSubmit').first();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    renderedComponent.unmount();
  });

  it('Renders an input for a new topic name', () => {
    expect(topicNameInput.html()).toContain('Provide unique topic name.');
  });

  it('Renders a topic description input', () => {
    expect(topicDescriptionInput.html()).toContain('Provide optional description.');
  });

  it('Renders a topic public switch', () => {
    expect(topicPublicSwitch.html()).toContain('topicPublicSwitch');
  });

  describe('Required Fields', () => {
    it('Requires a topic name', () => {
      const props: any = topicNameInput.props();
      expect(JSON.stringify(props.required)).toBe('true');
    });
  });

  describe('Creates a new Topic', () => {
    beforeEach(async () => {
      topicNameInput.simulate('change', { target: { value: 'New Topic Name' } });
      topicDescriptionInput.simulate('change', { target: { value: 'New Topic to Discuss' } });
      renderedComponent.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
      await act(async () => {
        submitButton.simulate('submit');
      });
    });

    it('creates a new topic', async () => {
      expect(addTopicSpy).toHaveBeenCalled();
    });

    it('Updates the topic with new id', async () => {
      expect(topicId).not.toEqual(DEFAULT_TOPIC.id);
    });

    it('It updates the topic Name on change', () => {
      expect(newTopic.name).toContain('New Topic Name');
    });

    it('updates the topic description on change', () => {
      expect(newTopic.description).toContain('New Topic to Discuss');
    });

    it('updates the topics public status', () => {
      expect(newTopic.public).toBeTruthy();
    });
    it(`shows ${ERRORS.FAILED_TO_CREATE} Alert if it fails to create new topic`, async () => {
      addTopicSpy.mockResolvedValue(undefined);
      await act(async () => {
        submitButton.simulate('submit');
      });
      expect(renderedComponent.html()).toContain(ERRORS.FAILED_TO_CREATE);
    });
  });
});
