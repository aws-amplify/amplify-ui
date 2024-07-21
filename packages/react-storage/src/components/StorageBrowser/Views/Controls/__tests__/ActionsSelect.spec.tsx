import React from 'react';
import { render } from '@testing-library/react';
import { ActionSelectControl } from '../ActionSelect';

describe('ActionSelectControl', () => {
  it('renders a `ActionSelectControl`', () => {
    expect(render(<ActionSelectControl />).container).toBeDefined();
  });
});
