import { ReactWrapper, mount } from 'enzyme';
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';
import React from 'react';

let renderedComponent: ReactWrapper;
let clickedHandleConfirm: boolean;
let clickedHandleClose: boolean;

let testProps: ConfirmationModalProps = {
  message: 'This is a Test Modal',
  header: 'Test Modal',
  handleConfirm: () => (clickedHandleConfirm = true),
  handleClose: () => (clickedHandleClose = true),
  show: true,
  alert: <div>Alert Element</div>,
};

beforeEach(() => {
  clickedHandleClose = clickedHandleConfirm = false;
  renderedComponent = mount(<ConfirmationModal {...testProps} />);
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('<ConfirmationModal />', () => {
  it('renders provided message from props', () => {
    expect(renderedComponent.text()).toContain(testProps.message);
  });

  it('renders header from props', () => {
    expect(renderedComponent.text()).toContain(testProps.header);
  });

  it('calls handle close when then the cancel button is clicked', () => {
    renderedComponent.find('#confirmCancelBtn').first().simulate('click');
    expect(clickedHandleClose).toBeTruthy();
  });

  it('calls handle confirm when the confirm button is clicked', () => {
    renderedComponent.find('#confirmConfirmBtn').first().simulate('click');
    expect(clickedHandleConfirm).toBeTruthy();
  });

  it('renders alert element from props', () => {
    expect(renderedComponent.text()).toContain('Alert Element');
  });
});
