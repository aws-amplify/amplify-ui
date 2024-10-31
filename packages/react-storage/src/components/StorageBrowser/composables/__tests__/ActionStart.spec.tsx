import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionStart } from '../ActionStart';
import { CLASS_BASE } from '../../views/constants';

describe('ActionStart', () => {
  it('renders a button element', () => {
    render(<ActionStart />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders a button with the expected className', () => {
    render(<ActionStart />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(`${CLASS_BASE}__action-start`);
  });

  it('renders a button with the expected text', () => {
    render(<ActionStart label="Start" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Start');
  });

  it('renders a button with the expected disabled state', () => {
    render(<ActionStart isDisabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
