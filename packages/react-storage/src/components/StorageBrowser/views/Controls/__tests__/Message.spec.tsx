import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageControl } from '../Message';

describe('MessageControl', () => {
  it('renders a `MessageControl`', () => {
    render(<MessageControl />);
    const message = screen.getByRole('alert');
    const dismiss = screen.getByRole('button', {
      name: 'Dismiss message',
    });
    expect(message).toBeInTheDocument();
    expect(dismiss).toBeInTheDocument();
  });

  it('renders `MessageControl` with error variation', () => {
    render(<MessageControl variant="error" />);
    const message = screen.getByRole('alert');
    const messageIcon = message.querySelector('svg');
    expect(messageIcon).toHaveAttribute('aria-label', 'Error');
  });

  it('renders `MessageControl` with info variation', () => {
    render(<MessageControl variant="info" />);
    const message = screen.getByRole('alert');
    const messageIcon = message.querySelector('svg');
    expect(messageIcon).toHaveAttribute('aria-label', 'Information');
  });

  it('renders `MessageControl` with success variation', () => {
    render(<MessageControl variant="success" />);
    const message = screen.getByRole('alert');
    const messageIcon = message.querySelector('svg');
    expect(messageIcon).toHaveAttribute('aria-label', 'Success');
  });

  it('renders `MessageControl` with warning variation', () => {
    render(<MessageControl variant="warning" />);
    const message = screen.getByRole('alert');
    const messageIcon = message.querySelector('svg');
    expect(messageIcon).toHaveAttribute('aria-label', 'Warning');
  });
});
