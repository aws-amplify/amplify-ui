import React from 'react';
import { render, screen } from '@testing-library/react';
import { FieldControl } from '../FieldControl';

describe('FieldControl', () => {
  it('renders a FieldControl component with the correct elements', () => {
    const result = render(<FieldControl />);
    expect(result.container).toBeDefined();

    const actionButtons = screen.getAllByRole('button');
    const textInput = screen.getByTestId('text-input');
    const fileInput = screen.getByTestId('hidden-file-input');

    expect(actionButtons).toHaveLength(2);
    expect(textInput).toBeDefined();
    expect(fileInput).toBeDefined();
  });

  it('renders FieldControl with the correct accessibility roles', () => {
    render(<FieldControl />);

    const actionButtons = screen.getAllByRole('button');

    const sendButton = actionButtons[1];

    expect(sendButton).not.toHaveAttribute('disabled');
    expect(sendButton).toHaveAttribute('aria-label', 'Send message');

    const sendIcon = sendButton.querySelector('svg');

    expect(sendIcon).toBeDefined();
    expect(sendIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it.todo('renders correct placeholder text in the input field');

  it.todo('disables the send button when the input field is empty');
  it.todo('disables the send button when waiting for an AI message');
  it.todo('sends the message when the send button is clicked');
  it.todo('attaches a file to the message when the attach button is clicked');

  it.todo('sanitizes input text');
  it.todo('sanitizes input images');
});
