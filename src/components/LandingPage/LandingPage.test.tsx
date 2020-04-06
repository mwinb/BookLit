import { ReactWrapper, mount } from 'enzyme';
import LandingPage from './LandingPage';
import React from 'react';

let renderedComponent: ReactWrapper;

afterEach(() => {
  renderedComponent.unmount();
});
describe('Landing Page', () => {
  beforeEach(() => {
    renderedComponent = mount(<LandingPage></LandingPage>);
  });

  it('renders', () => {
    expect(renderedComponent.text()).toContain('Welcome');
  });
});
