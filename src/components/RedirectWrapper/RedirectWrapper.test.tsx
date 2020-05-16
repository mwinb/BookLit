import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import RedirectWrapper from './RedirectWrapper';
import { MockRedirectWrapper } from '../../__mocks__/components/MockRedirectWrapper';

let renderedComponent: ReactWrapper;

jest.mock('react-router-dom', () => {
  return {
    Redirect: (props: any) => {
      return <MockRedirectWrapper to={props.to} />;
    },
  };
});

beforeEach(() => {
  renderedComponent = mount(<RedirectWrapper to="Test Route" />);
});

afterEach(() => {
  renderedComponent.unmount();
});

describe('<RedirectWrapper />', () => {
  it('renders redirect wrapper', () => {
    expect(renderedComponent).toBeDefined();
    expect(renderedComponent.text()).toContain('Test Route');
  });
});
