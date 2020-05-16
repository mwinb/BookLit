import { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import React from 'react';
import { DEFAULT_CLUB, ClubInterface, UserInterface } from '../../../common/interfaces';
import { Alert, Card, Form, Button } from 'react-bootstrap';
import { createClub, updateUser } from '../../../__mocks__';
import { ERRORS } from '../../../common/errors';
import { Routes } from '../../../common/Routes';
import RedirectWrapper from '../../RedirectWrapper/RedirectWrapper';

export interface NewClubPageProps {
  setUser(user: UserInterface): void;
  user: UserInterface;
}

const NewClubPage: FunctionComponent<NewClubPageProps> = (props): ReactElement => {
  const [club, setClub] = useState<ClubInterface>(DEFAULT_CLUB);
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const addClub = useCallback(
    async (e: any) => {
      e.preventDefault();
      /*
       * Create new topic id for generalChat and set club.generalChat to that id
       * Validate that Name does not already exist. (Think about just adding the club owner name for uniqueness)
       * Then just need to check against the owners current clubs for now.
       */
      const clubId = await createClub({
        ...club,
        name: club.name.trimRight(),
        description: club.description.trimRight(),
        book: club.book.trimRight(),
        owner: props.user.id,
        public: true,
        members: [props.user.id],
      });
      if (clubId) {
        const newUser = { ...props.user, clubs: [...props.user.clubs, clubId] };
        await updateUser(newUser);
        props.setUser({ ...newUser });
        setSubmitted(true);
      } else {
        setError(ERRORS.FAILED_TO_CREATE);
      }
    },
    [club, props],
  );

  return submitted ? (
    <RedirectWrapper to={Routes.HOME} />
  ) : (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card
        bg="dark"
        text="white"
        style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', padding: '2%', marginTop: '5%' }}
      >
        <Form onSubmit={addClub}>
          <Form.Group>
            <Form.Label>Club Name</Form.Label>
            <Form.Control
              type="text"
              minLength={6}
              id="clubNameInput"
              placeholder="Enter Name Of Club"
              onChange={(event: any) => setClub({ ...club, name: event.target.value.trimLeft() })}
              value={club.name}
              style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
              required={true}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              id="clubDescriptionInput"
              placeholder="Please Provide a Description"
              value={club.description}
              style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
              onChange={(event: any) => setClub({ ...club, description: event.target.value.trimLeft() })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Book Name</Form.Label>
            <Form.Control
              type="text"
              id="bookNameInput"
              placeholder="Enter Name of Book (can be changed later)"
              value={club.book}
              style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
              onChange={(event: any) => setClub({ ...club, book: event.target.value.trimLeft() })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default NewClubPage;
