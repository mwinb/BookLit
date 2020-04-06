import React from 'react';
import App from './App';
import { mount } from 'enzyme';

it('renders app', () => {
  const renderedComponent = mount(<App></App>);
  expect(renderedComponent.html()).toContain('Book Nook');
});
