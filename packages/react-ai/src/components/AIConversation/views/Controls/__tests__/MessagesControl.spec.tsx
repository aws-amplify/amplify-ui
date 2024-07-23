import React from 'react';
import { render, screen } from '@testing-library/react';

import { ConversationMessage } from '../../../types';

import { ActionsProvider } from '../../../context/ActionsContext';
import { AvatarsProvider } from '../../../context/AvatarsContext';
import { MessagesProvider } from '../../../context/MessagesContext';
import { MessagesControl, MessageControl } from '../MessagesControl';

import { convertBufferToBase64 } from '../../../utils';

const messages: ConversationMessage[] = [
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
      value: 'Are you sentient?',
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

const avatars = {
  user: {
    username: 'Scottleigh',
    avatar: (
      <svg>
        <text x="10" y="20">
          UAvatar
        </text>
      </svg>
    ),
  },
  ai: {
    username: 'Raven',
    avatar: (
      <svg>
        <text x="10" y="20">
          RAvatar
        </text>
      </svg>
    ),
  },
};

const customActions = [
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
    const result = render(<MessagesControl />);
    expect(result.container).toBeDefined();
  });

  it('renders a MessagesControl element with messages', () => {
    render(
      <MessagesProvider messages={messages}>
        <MessagesControl />
      </MessagesProvider>
    );
    const messageElements = screen.getAllByTestId('message');
    expect(messageElements).toHaveLength(3);
  });

  it('renders a MessagesControl element with avatars and actions', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <ActionsProvider actions={customActions}>
          <MessagesProvider messages={messages}>
            <MessagesControl />
          </MessagesProvider>
        </ActionsProvider>
      </AvatarsProvider>
    );
    const avatarElements = screen.getAllByTestId('avatar');
    const actionElements = screen.getAllByRole('button');
    expect(avatarElements).toHaveLength(3);
    expect(actionElements).toHaveLength(3);
  });

  it('renders a MessagesControl element with a custom renderMessage function', () => {
    const customMessage = jest.fn((message: ConversationMessage) => (
      <div key={message.id} data-testid="custom-message">
        {message.content.type === 'text' ? (
          message.content.value
        ) : (
          <img
            src={convertBufferToBase64(
              message.content.value.bytes,
              message.content.value.format
            )}
          ></img>
        )}
      </div>
    ));

    render(
      <MessagesProvider messages={messages}>
        <MessagesControl renderMessage={customMessage} />
      </MessagesProvider>
    );

    expect(customMessage).toHaveBeenCalledTimes(3);

    const defaultMessageElements = screen.queryAllByTestId('message');
    expect(defaultMessageElements).toHaveLength(0);

    const customMessageElements = screen.queryAllByTestId('custom-message');
    expect(customMessageElements).toHaveLength(3);
  });
});

describe('MessageControl', () => {
  it('renders a MessageControl text element', () => {
    render(<MessageControl message={messages[1]} />);
    const message = screen.getByText('Are you sentient?');
    expect(message).toBeInTheDocument();
  });

  it('renders a MessageControl image element', () => {
    render(<MessageControl message={messages[2]} />);
    const message = screen.getByRole('img');
    expect(message).toBeInTheDocument();
  });
});
