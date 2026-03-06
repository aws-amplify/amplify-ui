import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionCancel } from '../ActionCancel';

describe('ActionCancel', () => {
  it('renders a button element', () => {
    render(<ActionCancel />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders a button with the expected label', () => {
    render(<ActionCancel label="Cancel" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Cancel');
  });

  it('renders a button with the expected disabled state', () => {
    render(<ActionCancel isDisabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
