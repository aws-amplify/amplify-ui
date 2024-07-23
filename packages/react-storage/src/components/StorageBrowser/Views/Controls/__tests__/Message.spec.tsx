import React from 'react';
import { render } from '@testing-library/react';
import { MessageControl } from '../Message';

describe('MessageControl', () => {
  it('renders a `MessageControl`', () => {
    expect(render(<MessageControl />).container).toBeDefined();
  });
});
