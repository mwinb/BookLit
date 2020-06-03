import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import RequestManagement, { RequestManagementProps } from './RequestManagement';
import * as API from '../../../../common/API/APICalls';
import { mockRequests, mockClubs } from '../../../../__mocks__';
import { act } from 'react-dom/test-utils';
import * as RequestCard from './RequestCard/RequestCard';
import { Button } from 'react-bootstrap';

let renderedComponent: ReactWrapper;
let spyGetRequestsByClubId: jest.SpyInstance<any, any>;
const testProps: RequestManagementProps = {
  clubId: mockClubs[0].id,
};

beforeEach(async () => {
  spyGetRequestsByClubId = jest.spyOn(API, 'getRequestsByClubId').mockResolvedValue([mockRequests[0]]);
  jest.spyOn(RequestCard, 'default').mockImplementation((props) => {
    return (
      <div id="requestCard">
        <p>{props.request.username}</p>
        <p>{props.request.message}</p>
        <Button className="mockApproveButton" onClick={props.handleUpdatingRequests}>
          Approve
        </Button>
        <Button className="mockErrorButton" onClick={() => props.setError('Error Set')}>
          Set Error
        </Button>
      </div>
    );
  });
  await act(async () => {
    renderedComponent = mount(<RequestManagement {...testProps} />);
  });
  renderedComponent.update();
});

afterEach(() => {
  jest.resetAllMocks();
  renderedComponent.unmount();
});

describe('<RequestManagement />', () => {
  it('retrieves a list of requests given a club id on render', () => {
    expect(spyGetRequestsByClubId).toHaveBeenCalledTimes(1);
  });

  it('maps a list of requests showing the username and message', () => {
    expect(renderedComponent.text()).toContain(mockRequests[0].username);
    expect(renderedComponent.text()).toContain(mockRequests[0].message);
  });

  it('It sets an alert if there is an error in the Request Card', async () => {
    await act(async () => {
      renderedComponent.find('.mockErrorButton').first().simulate('click');
    });
    renderedComponent.update();
    expect(renderedComponent.text()).toContain('Error Set');
  });
});
