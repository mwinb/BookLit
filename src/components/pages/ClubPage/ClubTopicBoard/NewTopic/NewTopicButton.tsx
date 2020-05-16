import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Button } from 'react-bootstrap';
import NewTopicModal from './NewTopicModal';

export interface NewTopicButtonProps {
  clubId: string;
  updateTopic(newTopic: string): void;
}

export const NewTopicButton: FunctionComponent<NewTopicButtonProps> = (props): ReactElement => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const setShowTrue = () => {
    setModalShow(true);
  };
  const setShowFalse = () => {
    setModalShow(false);
  };
  return (
    <>
      <Button
        id="showNewTopicModal"
        variant="outline-success"
        style={{ color: 'white' }}
        onClick={setShowTrue}
        className="ml-2"
      >
        Create
      </Button>
      <NewTopicModal show={modalShow} onHide={setShowFalse} {...props} />
    </>
  );
};

export default NewTopicButton;
