import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessagesProvider } from '../../../context/MessagesContext';
import { FieldControl } from '../FieldControl';

describe('FieldControl', () => {
  it('renders a FieldControl component with the correct elements', () => {
    const result = render(<FieldControl />);
    expect(result.container).toBeDefined();

    const form = screen.findByRole('form');
    const actionButtons = screen.getAllByRole('button');
    const textInput = screen.getByTestId('text-input');
    const fileInput = screen.getByTestId('hidden-file-input');

    expect(form).toBeDefined();
    expect(actionButtons).toHaveLength(2);
    expect(textInput).toBeDefined();
    expect(fileInput).toBeDefined();
  });

  it('renders FieldControl with the correct accessibility roles', () => {
    render(<FieldControl />);

    const actionButtons = screen.getAllByRole('button');
    const sendButton = actionButtons[1];
    const textarea = screen.getByRole('textbox', {
      name: /Type your message here/i,
    });

    expect(sendButton).toHaveAttribute('aria-label', 'Send message');

    const sendIcon = sendButton.querySelector('svg');

    expect(sendIcon).toBeDefined();
    expect(sendIcon).toHaveAttribute('aria-hidden', 'true');
    expect(textarea).toBeDefined();
  });

  it('renders correct placeholder text in the input field', () => {
    const { rerender } = render(
      <MessagesProvider messages={[]}>
        <FieldControl />
      </MessagesProvider>
    );
    const textInput = screen.getByTestId('text-input');
    expect(textInput).toHaveAttribute('placeholder', 'Ask anything...');

    rerender(
      <MessagesProvider
        messages={[
          {
            conversationId: 'foobar',
            id: '1',
            content: [{ text: 'I am your virtual assistant' }],
            role: 'assistant',
            createdAt: new Date(2023, 4, 21, 15, 23).toDateString(),
          },
        ]}
      >
        <FieldControl />
      </MessagesProvider>
    );

    expect(textInput).toHaveAttribute('placeholder', 'Message Raven');
  });

  it.todo('disables the send button when the input field is empty');
  it.todo('disables the send button when waiting for an AI message');
  it.todo('sends the message when the send button is clicked');
  it.todo('attaches a file to the message when the attach button is clicked');
});
