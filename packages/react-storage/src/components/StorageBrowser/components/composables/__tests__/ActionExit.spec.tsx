import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionExit } from '../ActionExit';

const label = 'Leave?';

describe('ActionExit', () => {
  it('renders a button element', () => {
    render(<ActionExit />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('renders a button with the expected label', () => {
    render(<ActionExit label={label} />);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(label);
  });

  it('renders an icon', () => {
    render(<ActionExit />);

    const icon = screen.getByRole('img', { hidden: true });

    expect(icon).toBeInTheDocument();
  });

  it('renders a button with the expected disabled state', () => {
    render(<ActionExit isDisabled />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
