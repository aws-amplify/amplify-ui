import React from 'react';
import TestRenderer from 'react-test-renderer';

import RenderNothng from '../RenderNothing';

describe('RenderNothng', () => {
  it('renders nothing', () => {
    const renderer = TestRenderer.create(<RenderNothng />);

    expect(renderer.toJSON()).toBeNull();
  });
});
