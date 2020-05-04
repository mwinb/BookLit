import { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import React from 'react';
import { DEFAULT_TOPIC } from '../../../../../common/interfaces';
import { API } from '../../../../../__mocks__';
import { ERRORS } from '../../../../../common/errors';

export interface NewTopicButtonProps {
  api: API;
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
      <Button variant="primary" onClick={setShowTrue}>
        +
      </Button>
      <NewTopicModal show={modalShow} onHide={setShowFalse} {...props} />
    </>
  );
};

export interface NewTopicModalProps extends NewTopicButtonProps {
  show: boolean;
  onHide(): void;
}

export const NewTopicModal: FunctionComponent<NewTopicModalProps> = (props): ReactElement => {
  const [topic, setTopic] = useState(DEFAULT_TOPIC);
  const [error, setError] = useState<string>();
  const createTopic = useCallback(
    async (event: any) => {
      event.preventDefault();
      const topicId = await props.api.addTopic({
        ...topic,
        name: topic.name.trimRight(),
        description: topic.description.trimRight(),
        club: props.clubId,
      });
      if (topicId) {
        props.updateTopic(topicId);
        setTopic(DEFAULT_TOPIC);
        props.onHide();
      } else {
        setError(ERRORS.FAILED_TO_CREATE);
      }
    },
    [topic, props],
  );

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="bg-dark text-white">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">New Topic</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createTopic}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group style={{ textAlign: 'center' }}>
              <Form.Label>Topic Name</Form.Label>
              <Form.Control
                type="text"
                minLength={6}
                id="topicNameInput"
                placeholder="Provide unique topic name."
                onChange={(event: any) => setTopic({ ...topic, name: event.target.value.trimLeft() })}
                value={topic.name}
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}
                required={true}
              />
            </Form.Group>
            <Form.Group style={{ textAlign: 'center' }}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                id="topicDescriptionInput"
                placeholder="Provide optional description."
                value={topic.description}
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}
                onChange={(event: any) => setTopic({ ...topic, description: event.target.value.trimLeft() })}
                required
              />
            </Form.Group>
            <Form.Group style={{ textAlign: 'center' }}>
              <Form.Label>Public? Shows Usernames.</Form.Label>
              <Form.Check
                type="switch"
                style={{ transform: 'scale(1.4)' }}
                onChange={() => setTopic({ ...topic, public: !topic.public })}
                id="topicPublicSwitch"
                checked={topic.public}
                label=""
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id="newTopicSubmit" type="submit" onSubmit={createTopic}>
              Submit
            </Button>
            <Button variant="danger" onClick={props.onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default NewTopicButton;
