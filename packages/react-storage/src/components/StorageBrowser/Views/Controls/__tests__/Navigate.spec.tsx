import React from 'react';
import { render } from '@testing-library/react';
import { NavigateControl } from '../Navigate';

describe('NavigateControl', () => {
  it('renders a `NavigateControl`', () => {
    expect(render(<NavigateControl />).container).toBeDefined();
  });
});
