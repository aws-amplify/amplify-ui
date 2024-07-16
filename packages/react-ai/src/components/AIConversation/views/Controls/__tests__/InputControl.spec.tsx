import React from 'react';
import { render } from '@testing-library/react';
import { InputControl } from '../InputControl';

describe('InputControl', () => {
  it('renders an InputControl element', () => {
    const result = render(<InputControl />);
    expect(result.container).toBeDefined();
  });
});
