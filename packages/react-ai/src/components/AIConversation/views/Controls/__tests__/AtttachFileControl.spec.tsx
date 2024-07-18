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

  it.todo('renders correct placeholder text in the input field');

  it.todo('disables the send button when the input field is empty');
  it.todo('disables the send button when waiting for an AI message');
  it.todo('sends the message when the send button is clicked');
  it.todo('attaches a file to the message when the attach button is clicked');

  it.todo('sanitizes input text');
  it.todo('sanitizes input images');
});
