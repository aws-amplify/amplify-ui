import React from 'react';
import { HelloWorld } from '..';
import TestRenderer from 'react-test-renderer';

describe('HelloWorld', () => {
  it('should render as expected', () => {
    const renderer = TestRenderer.create(<HelloWorld />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
