import React, { FunctionComponent, ReactElement, useState, useCallback } from 'react';
import { RequestInterface } from '../../../../../common/interfaces';
import { Card, Button } from 'react-bootstrap';
import { getMaxWidth } from '../../../../../common/utils/utils';
import { approveRequest, rejectRequest } from '../../../../../common/API';
import { ERRORS } from '../../../../../common/errors';

export interface RequestCardProps {
  request: RequestInterface;
  handleUpdatingRequests(): Promise<void>;
  setError(newError: string): void;
}

export const MIN_CARD_WIDTH = 50;
export const MAX_CARD_WIDTH = 100;
export const WINDOW_SIZE_CUT_OFF = 800;

const RequestCard: FunctionComponent<RequestCardProps> = (props): ReactElement => {
  const [minCardWidth] = useState<number>(
    getMaxWidth(window.innerWidth, MAX_CARD_WIDTH, MIN_CARD_WIDTH, WINDOW_SIZE_CUT_OFF),
  );

  const handleApproveRequest = useCallback(async () => {
    const approved = await approveRequest(props.request.id);
    if (approved) await props.handleUpdatingRequests();
    else props.setError(ERRORS.FAILED_TO_APPROVE_REQUEST);
  }, [props]);

  const handleRejectRequest = useCallback(async () => {
    const rejected = await rejectRequest(props.request.id);
    if (rejected) await props.handleUpdatingRequests();
    else props.setError(ERRORS.UNKNOWN);
  }, [props]);

  return (
    <Card
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
      <Card.Header style={{ fontWeight: 'bold' }}>{props.request.username}</Card.Header>
      <Card.Body>
        <p>{props.request.message}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button
          className="approveRequestButton"
          variant="outline-success"
          style={{ color: 'white' }}
          onClick={handleApproveRequest}
        >
          Approve
        </Button>
        <Button
          className="rejectRequestButton"
          variant="outline-danger"
          style={{ color: 'white' }}
          onClick={handleRejectRequest}
        >
          Reject
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default RequestCard;
