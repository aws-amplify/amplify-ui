import React from 'react';
import { render } from '@testing-library/react';
import { ActionView } from '../ActionView';

describe('ActionView', () => {
  it('renders a `ActionView`', () => {
    expect(render(<ActionView />).container).toBeDefined();
  });
});
