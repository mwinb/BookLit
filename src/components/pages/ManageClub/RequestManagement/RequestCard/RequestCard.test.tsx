import { ReactWrapper, mount } from 'enzyme';
import RequestCard, { RequestCardProps } from './RequestCard';
import React from 'react';
import { mockRequests } from '../../../../../__mocks__';
import { act } from 'react-dom/test-utils';
import * as API from '../../../../../common/API/APICalls';
import { RequestInterface } from '../../../../../common/interfaces';
import { ERRORS } from '../../../../../common/errors';

let renderedComponent: ReactWrapper;
let requests: RequestInterface[];
let error: string;

let testProps: RequestCardProps = {
  request: mockRequests[0],
  handleUpdatingRequests: async () => {
    requests = mockRequests;
  },
  setError: (newError: string) => {
    error = newError;
  },
};
let approveRequestSpy: jest.SpyInstance<any, any>;
let rejectRequestSpy: jest.SpyInstance<any, any>;

afterEach(() => {
  jest.resetAllMocks();
  renderedComponent.unmount();
});

beforeEach(() => {
  requests = [];
  error = '';
});

describe('<RequestCard />', () => {
  beforeEach(() => {
    renderedComponent = mount(<RequestCard {...testProps} />);
  });

  it('Renders a request message given a request', () => {
    expect(renderedComponent.text()).toContain(mockRequests[0].message);
  });

  it('renders the requests userName', () => {
    expect(renderedComponent.text()).toContain(mockRequests[0].username);
  });

  it('contains an approve button', () => {
    expect(renderedComponent.text()).toContain('Approve');
  });

  it('contains reject button', () => {
    expect(renderedComponent.text()).toContain('Reject');
  });
});

describe('approveRequest', () => {
  describe('success', () => {
    beforeEach(async () => {
      approveRequestSpy = jest.spyOn(API, 'approveRequest').mockResolvedValue(mockRequests[0].id);
      renderedComponent = mount(<RequestCard {...testProps} />);

      await act(async () => {
        renderedComponent.find('.approveRequestButton').first().simulate('click');
      });
    });

    it('calls approve request when approve button is clicked', () => {
      expect(approveRequestSpy).toHaveBeenCalledTimes(1);
    });

    it('if successful it handles updating requests after approving', () => {
      expect(requests).toEqual(mockRequests);
    });
  });

  describe('failure', () => {
    beforeEach(async () => {
      approveRequestSpy.mockReturnValue(undefined);
      renderedComponent = mount(<RequestCard {...testProps} />);

      await act(async () => {
        renderedComponent.find('.approveRequestButton').first().simulate('click');
      });
    });

    it('sets error if it fails to approve requests', () => {
      expect(error).toBe(ERRORS.FAILED_TO_APPROVE_REQUEST);
    });
  });
});

describe('reject request', () => {
  describe('success', () => {
    beforeEach(async () => {
      rejectRequestSpy = jest.spyOn(API, 'rejectRequest').mockResolvedValue(mockRequests[0].id);
      renderedComponent = mount(<RequestCard {...testProps} />);

      await act(async () => {
        renderedComponent.find('.rejectRequestButton').first().simulate('click');
      });
    });

    it('calls rejectRequest from api when user clicks reject button', () => {
      expect(rejectRequestSpy).toHaveBeenCalledTimes(1);
    });

    it('if successful it handles updating requests after rejecting', () => {
      expect(requests).toEqual(mockRequests);
    });
  });

  describe('failure', () => {
    beforeEach(async () => {
      rejectRequestSpy.mockReturnValue(undefined);
      renderedComponent = mount(<RequestCard {...testProps} />);

      await act(async () => {
        renderedComponent.find('.rejectRequestButton').first().simulate('click');
      });
    });

    it('sets error if it fails to approve requests', () => {
      expect(error).toBe(ERRORS.UNKNOWN);
    });
  });
});
