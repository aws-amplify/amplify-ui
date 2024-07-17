import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputControl } from '../InputControl';

describe('InputControl', () => {
  it('renders an InputControl component with the correct elements', () => {
    const result = render(<InputControl />);
    expect(result.container).toBeDefined();

    const actionButtons = screen.getAllByRole('button');
    const inputEl = screen.getByRole('textbox');

    expect(actionButtons).toHaveLength(2);
    expect(inputEl).toBeDefined();
  });

  it('renders InputControl with the correct accessibility roles', () => {
    render(<InputControl />);

    const actionButtons = screen.getAllByRole('button');

    const attachButton = actionButtons[0];
    const sendButton = actionButtons[1];

    expect(sendButton).toHaveAttribute('aria-disabled', 'false');
    expect(attachButton).toHaveAttribute('aria-label', 'Attach item');
    expect(sendButton).toHaveAttribute('aria-label', 'Send message');

    const attachIcon = attachButton.querySelector('svg');
    const sendIcon = sendButton.querySelector('svg');

    expect(attachIcon).toBeDefined();
    expect(sendIcon).toBeDefined();
    expect(attachIcon).toHaveAttribute('aria-hidden', 'true');
    expect(sendIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it.todo('renders correct placeholder text in the input field');

  it.todo('disables the send button when the input field is empty');
  it.todo('disables the send button when waiting for an AI message');
  it.todo('calls the correct handler when the send button is clicked');
  it.todo('calls the correct handler when the attach button is clicked');

  it.todo('sanitizes input text');
});
