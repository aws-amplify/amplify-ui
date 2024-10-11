import React from 'react';
import { render } from '@testing-library/react';
import { HeaderControl } from '../HeaderControl';

describe('HeaderControl', () => {
  it('renders a HeaderControl element', () => {
    const result = render(<HeaderControl />);
    expect(result.container).toBeDefined();
    expect(result.findAllByText('anything')).toBeDefined();
  });
});
