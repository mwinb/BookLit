import { ConfirmationModalProps } from '../../components/ConfirmationModal/ConfirmationModal';
import { ReactElement, FunctionComponent } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';

export const MockConfirmationModal: FunctionComponent<ConfirmationModalProps> = (props): ReactElement => {
  return (
    <>
      {props.show && (
        <>
          <h1>Confirmation Modal</h1>
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
};
