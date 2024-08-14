import React from 'react';
import { render, screen } from '@testing-library/react';
import { CancelControl } from '../Cancel';

describe('CancelControl', () => {
  it('renders the CancelControl', () => {
    const ariaLabel = 'Cancel file upload';

    render(<CancelControl ariaLabel={ariaLabel} />);

    const button = screen.getByRole('button', {
      name: ariaLabel,
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
