import React from 'react';
import { render } from '@testing-library/react';
import { TargetControl } from '../Target';

describe('TargetControl', () => {
  it('renders a `TargetControl`', () => {
    expect(render(<TargetControl />).container).toBeDefined();
  });
});
