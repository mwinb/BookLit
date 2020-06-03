import React, { FunctionComponent, ReactElement, useState, useEffect, useCallback } from 'react';
import { UserInterface } from '../../../../common/interfaces';
import { getMaxWidth } from '../../../../common/utils/utils';
import { SUCCESS_REQUEST, getUsersByClubId, removeUserFromClub } from '../../../../common/API';
import { Card, Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export interface MemberManagementProps {
  clubId: string;
  clubOwner: string;
}

export const MIN_CARD_WIDTH = 50;
export const MAX_CARD_WIDTH = 100;
export const WINDOW_SIZE_CUT_OFF = 800;

const MemberManagement: FunctionComponent<MemberManagementProps> = (props): ReactElement => {
  const [members, setMembers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string>();
  const [minCardWidth] = useState<number>(
    getMaxWidth(window.innerWidth, MAX_CARD_WIDTH, MIN_CARD_WIDTH, WINDOW_SIZE_CUT_OFF),
  );

  const removeUser = useCallback(
    async (userId: string, index: number) => {
      const response = await removeUserFromClub(userId, props.clubId);
      if (response === SUCCESS_REQUEST) {
        setMembers(members.filter((_member, i) => i !== index));
      } else setError(response);
    },
    [props.clubId, members],
  );

  const retrieveMembers = useCallback(async () => {
    const response = await getUsersByClubId(props.clubId);
    if (response) {
      setMembers(response);
    }
  }, [props.clubId]);

  useEffect(() => {
    retrieveMembers();
  }, [retrieveMembers]);
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {members.map((member, index) => {
        return (
          member.id !== props.clubOwner && (
            <Card
              key={`${member.username}:${index}`}
              bg="dark"
              text="white"
              border="success"
              style={{
                maxWidth: 'max-content',
                minWidth: `${minCardWidth}%`,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '2%',
                marginBottom: '2%',
                textAlign: 'left',
              }}
            >
              <Card.Header style={{ fontWeight: 'bold' }} className="d-flex justify-content-between">
                <Card.Title className="w-50">{member.username}</Card.Title>
                <Button
                  className="removeUserButton"
                  variant="outline-danger"
                  style={{ color: 'white' }}
                  onClick={() => removeUser(member.id, index)}
                >
                  Remove
                </Button>
              </Card.Header>
            </Card>
          )
        );
      })}
    </>
  );
};

export default MemberManagement;
