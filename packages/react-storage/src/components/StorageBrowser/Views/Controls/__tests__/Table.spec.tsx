import React from 'react';
import { render } from '@testing-library/react';
import { TableControl } from '../Table';

describe('TableControl', () => {
  it('renders a `TableControl`', () => {
    expect(render(<TableControl />).container).toBeDefined();
  });
});
