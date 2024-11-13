import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionExit } from '../ActionExit';
import { CLASS_BASE } from '../../views/constants';

const label = 'Leave?';

describe('ActionExit', () => {
  it('renders a button element', () => {
    render(<ActionExit />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('renders a button with the expected className and label', () => {
    render(<ActionExit label={label} />);

    const button = screen.getByRole('button');

    expect(button).toHaveClass(`${CLASS_BASE}__exit`);
    expect(button).toHaveTextContent(label);
  });

  it('renders an icon with the expected className', () => {
    render(<ActionExit />);

    const icon = screen.getByRole('img', { hidden: true });

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(`${CLASS_BASE}__exit__icon`);
  });

  it('renders a button with the expected disabled state', () => {
    render(<ActionExit isDisabled />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
