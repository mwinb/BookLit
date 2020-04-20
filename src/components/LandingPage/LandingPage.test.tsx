import { ReactWrapper, mount } from 'enzyme';
import LandingPage from './LandingPage';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

let renderedComponent: ReactWrapper;

afterEach(() => {
  renderedComponent.unmount();
});
describe('Landing Page', () => {
  beforeEach(() => {
    renderedComponent = mount(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
  });

  it('renders', () => {
    expect(renderedComponent.text()).toContain('Welcome');
  });
});
