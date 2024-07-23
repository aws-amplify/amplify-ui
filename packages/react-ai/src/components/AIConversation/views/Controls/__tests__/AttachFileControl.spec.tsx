import React from 'react';
import { render, screen } from '@testing-library/react';
import { AttachFileControl } from '../AttachFileControl';

describe('AttachFileControl', () => {
  it('renders an AttachFileControl component with the correct elements', () => {
    const result = render(<AttachFileControl />);
    expect(result.container).toBeDefined();

    const attachButton = screen.getByRole('button');
    const attachIcon = attachButton.querySelector('svg');
    const fileInput = screen.getByTestId('hidden-file-input');

    expect(attachButton).toBeDefined();
    expect(attachIcon).toBeDefined();
    expect(fileInput).toBeDefined();
  });

  it('renders AttachFileControl with the correct accessibility roles', () => {
    render(<AttachFileControl />);

    const attachButton = screen.getByRole('button');
    const attachIcon = attachButton.querySelector('svg');

    expect(attachButton).toHaveAttribute('aria-label', 'Attach file');
    expect(attachIcon).toBeDefined();
    expect(attachIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
