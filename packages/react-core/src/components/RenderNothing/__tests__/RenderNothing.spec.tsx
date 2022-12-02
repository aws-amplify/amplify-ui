import React from 'react';
import TestRenderer from 'react-test-renderer';

import RenderNothing from '../RenderNothing';

describe('RenderNothing', () => {
  it('renders nothing', () => {
    const renderer = TestRenderer.create(<RenderNothing />);

    expect(renderer.toJSON()).toBeNull();
  });
});
