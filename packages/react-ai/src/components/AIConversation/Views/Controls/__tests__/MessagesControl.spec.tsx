import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MessagesControl, MessageControl } from '../MessagesControl';
import { Avatars, Message, CustomAction } from '../../../types';

const messages: Message[] = [
  {
    id: '1',
    content: { type: 'text', value: 'I am your virtual assistant' },
    role: 'assistant',
    timestamp: new Date(2023, 4, 21, 15, 23),
  },
  {
    id: '2',
    content: {
      type: 'text',
      value:
        'I have a really long question. This is a long message This is a long message This is a long message This is a long message This is a long message',
    },
    role: 'user',
    timestamp: new Date(2023, 4, 21, 15, 24),
  },
  {
    id: '3',
    content: {
      type: 'image',
      value: {
        format: 'png',
        bytes: new Uint8Array([]).buffer,
      },
    },
    role: 'assistant',
    timestamp: new Date(2023, 4, 21, 15, 25),
  },
];

const avatars: Avatars = {
  user: {
    username: 'User Username',
    avatar: (
      <svg viewBox="0 0 24 24">
        <path d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
        <path d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
      </svg>
    ),
  },
  ai: {
    username: 'Raven Username',
    avatar: (
      <svg viewBox="0 0 24 24">
        <path d="M10,10.9c2.373,0,4.303-1.932,4.303-4.306c0-2.372-1.93-4.302-4.303-4.302S5.696,4.223,5.696,6.594C5.696,8.969,7.627,10.9,10,10.9z M10,3.331c1.801,0,3.266,1.463,3.266,3.263c0,1.802-1.465,3.267-3.266,3.267c-1.8,0-3.265-1.465-3.265-3.267C6.735,4.794,8.2,3.331,10,3.331z"></path>
        <path d="M10,12.503c-4.418,0-7.878,2.058-7.878,4.685c0,0.288,0.231,0.52,0.52,0.52c0.287,0,0.519-0.231,0.519-0.52c0-1.976,3.132-3.646,6.84-3.646c3.707,0,6.838,1.671,6.838,3.646c0,0.288,0.234,0.52,0.521,0.52s0.52-0.231,0.52-0.52C17.879,14.561,14.418,12.503,10,12.503z"></path>
      </svg>
    ),
  },
};

const customActions: CustomAction[] = [
  {
    displayName: 'Heart',
    icon: (
      <svg width="20px" height="20px">
        <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z" />
      </svg>
    ),
    handler: jest.fn(),
  },
];

describe('MessagesControl', () => {
  it('renders a MessagesControl element', () => {
    render(
      <MessagesControl
        actions={customActions}
        avatars={avatars}
        messages={messages}
      />
    );
    const messageElements = screen.getAllByText(/Username/);
    expect(messageElements).toHaveLength(3);
  });
});

describe('MessageControl', () => {
  it('renders a MessageControl text element', () => {
    render(<MessageControl message={messages[0]} />);
    const message = screen.getByText('I am your virtual assistant');
    expect(message).toBeInTheDocument();
  });

  it('renders a MessageControl image element', () => {
    render(<MessageControl message={messages[2]} />);
    const message = screen.getByRole('img');
    expect(message).toBeInTheDocument();
  });
});
