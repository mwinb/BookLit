import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { ClubInterface } from '../../../../../common/interfaces';
import { Button, Alert } from 'react-bootstrap';
import ConfirmationModal from '../../../../ConfirmationModal/ConfirmationModal';
import { deleteTopic } from '../../../../../common/API';
import { ERRORS } from '../../../../../common/errors';

export interface DeleteTopicButtonProps {
  topicId: string;
  club: ClubInterface;
  handleUpdateClub(club: ClubInterface): void;
  handleUpdateCurrentTopic(topicId: string): void;
}

export const DeleteTopicButton: FunctionComponent<DeleteTopicButtonProps> = (props): ReactElement => {
  const [showModal, setModalShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const setShowTrue = () => {
    setModalShow(true);
  };
  const setShowFalse = () => {
    setModalShow(false);
  };

  const handleDeleteTopic = useCallback(async () => {
    if (await deleteTopic(props.topicId)) {
      props.handleUpdateCurrentTopic(props.club.generalChat);
      setModalShow(false);
    } else {
      setError(ERRORS.UNKNOWN);
    }
  }, [props]);

  return (
    <>
      <Button variant="outline-danger" id="showConfirmationModal" onClick={setShowTrue} className="ml-2 text-light">
        Delete
      </Button>
      <ConfirmationModal
        handleClose={setShowFalse}
        handleConfirm={handleDeleteTopic}
        alert={error ? <Alert variant="danger">{error}</Alert> : <></>}
        message="Are you sure you want to delete this topic?"
        header="Confirm"
        show={showModal}
      ></ConfirmationModal>
    </>
  );
};

export default DeleteTopicButton;
