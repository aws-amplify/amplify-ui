import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionCancel } from '../ActionCancel';
import { CLASS_BASE } from '../../views/constants';

describe('ActionCancel', () => {
  it('renders a button element', () => {
    render(<ActionCancel />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders a button with the expected className, text and aria label', () => {
    render(<ActionCancel text="Cancel" ariaLabel="Aria Label" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(`${CLASS_BASE}__action-cancel`);
    expect(button).toHaveTextContent('Cancel');
    expect(button).toHaveAttribute('aria-label', 'Aria Label');
  });

  it('renders a button with the expected disabled state', () => {
    render(<ActionCancel isDisabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders an icon with the expected className', () => {
    render(<ActionCancel />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveClass(`${CLASS_BASE}__action-cancel-icon`);
  });
});
