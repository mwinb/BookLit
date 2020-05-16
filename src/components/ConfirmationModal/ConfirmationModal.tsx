import { Modal, Button } from 'react-bootstrap';
import React, { FunctionComponent, ReactElement } from 'react';

export interface ConfirmationModalProps {
  handleClose(): void;
  handleConfirm(): void;
  message: string;
  header: string;
  show: boolean;
  alert: ReactElement;
}

const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = (props): ReactElement => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <div className="bg-dark text-white">
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.alert}
          {props.message}
        </Modal.Body>
        <Modal.Footer>
          <Button id="confirmConfirmBtn" variant="primary" onClick={props.handleConfirm}>
            Confirm
          </Button>
          <Button id="confirmCancelBtn" variant="danger" onClick={props.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
