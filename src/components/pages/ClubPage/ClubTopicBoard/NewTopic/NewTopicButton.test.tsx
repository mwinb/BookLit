import { Button } from 'react-bootstrap';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import NewTopicButton, { NewTopicButtonProps } from './NewTopicButton';
import { mockClubs } from '../../../../../__mocks__';
import * as Something from './NewTopicModal';

const testNewTopicButtonProps: NewTopicButtonProps = {
  clubId: mockClubs[0].id,
  updateTopic: (_newTopicId: string) => null,
};

let renderedComponent: ReactWrapper;
describe('<NewTopicButton>', () => {
  beforeEach(() => {
    jest.spyOn(Something, 'default').mockImplementation((props: Something.NewTopicModalProps) => {
      return (
        <>
          {props.show && (
            <Button id="closeModalButton" onClick={props.onHide}>
              Shown
            </Button>
          )}
          {!props.show && <h2>Not Shown</h2>}
        </>
      );
    });
    renderedComponent = mount(<NewTopicButton {...testNewTopicButtonProps}></NewTopicButton>);
  });

  afterEach(() => {
    renderedComponent.unmount();
  });

  it('initially does not show the modal', () => {
    expect(renderedComponent.html()).toContain('Not Shown');
  });

  it('opens the modal when the button is clicked', () => {
    renderedComponent.find('#showNewTopicModal').first().simulate('click');
    expect(renderedComponent.html()).toContain('Shown');
  });

  it('closes the model when the onHide function is executed', () => {
    renderedComponent.find('#showNewTopicModal').first().simulate('click');
    renderedComponent.find(Button).at(1).simulate('click');
    expect(renderedComponent.html()).toContain('Not Shown');
  });
});
