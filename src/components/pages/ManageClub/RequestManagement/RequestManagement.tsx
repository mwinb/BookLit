import React, { FunctionComponent, ReactElement, useState, useCallback, useEffect } from 'react';
import { RequestInterface } from '../../../../common/interfaces/RequestInterface';
import { getRequestsByClubId } from '../../../../common/API';
import RequestCard from './RequestCard/RequestCard';
import { Alert } from 'react-bootstrap';

export const REQUEST_MANAGEMENT_TITLE = 'Requests';

export interface RequestManagementProps {
  clubId: string;
}

const RequestManagement: FunctionComponent<RequestManagementProps> = (props): ReactElement => {
  const [requests, setRequests] = useState<RequestInterface[]>();
  const [error, setError] = useState<string>();

  const populateRequests = useCallback(async () => {
    const retrievedRequests = await getRequestsByClubId(props.clubId);
    setRequests(retrievedRequests);
  }, [props.clubId]);

  useEffect(() => {
    populateRequests();
  }, [populateRequests]);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="container overflow-scroll" style={{ width: '100%', height: '80%', overflowY: 'scroll' }}>
        {requests?.map((request, index) => {
          return (
            <RequestCard
              key={`${request.id}-${index}`}
              request={request}
              handleUpdatingRequests={populateRequests}
              setError={setError}
            />
          );
        })}
      </div>
    </>
  );
};

export default RequestManagement;
