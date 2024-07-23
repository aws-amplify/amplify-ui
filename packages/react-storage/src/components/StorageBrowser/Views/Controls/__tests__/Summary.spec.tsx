import React from 'react';
import { render } from '@testing-library/react';
import { SummaryControl } from '../Summary';

describe('SummaryControl', () => {
  it('renders a `SummaryControl`', () => {
    expect(render(<SummaryControl />).container).toBeDefined();
  });
});
