import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import ConfirmationModal from '../../../ConfirmationModal/ConfirmationModal';
import { deleteClub } from '../../../../common/API';
import { ERRORS } from '../../../../common/errors';
import { Button, Alert } from 'react-bootstrap';
import { useUser } from '../../../../common/context/UserContext';

export interface DeleteClubButtonProps {
  clubId: string;
}

const DeleteClubButton: FunctionComponent<DeleteClubButtonProps> = (props): ReactElement => {
  const { user, setUser } = useUser();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const setShowFalse = () => {
    setConfirmDelete(false);
  };

  const setShowTrue = () => {
    setConfirmDelete(true);
  };

  const handleDeleteClub = useCallback(async () => {
    if (await deleteClub(props.clubId)) {
      setUser({ ...user, clubs: user.clubs.filter((club) => club !== props.clubId) });
      setShowFalse();
    } else {
      setError(ERRORS.UNKNOWN);
    }
  }, [props.clubId, setUser, user]);

  return (
    <>
      <Button
        variant="outline-danger"
        style={{ color: 'white' }}
        id="deleteClubButton"
        onClick={setShowTrue}
        className="ml-2 mr-2"
      >
        Delete
      </Button>
      <ConfirmationModal
        show={confirmDelete}
        alert={error ? <Alert variant="danger">{error}</Alert> : <></>}
        message={'Are you sure you want to delete this club?'}
        header={'Confirm'}
        handleClose={setShowFalse}
        handleConfirm={handleDeleteClub}
      />
    </>
  );
};

export default DeleteClubButton;
