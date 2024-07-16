import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConversationMessage } from '../../../types';
import { AvatarsProvider } from '../../../context/AvatarsContext';
import { AvatarControl } from '../AvatarControl';

const avatars = {
  user: {
    username: 'Jane Doe',
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

const messages: ConversationMessage[] = [
  {
    id: '1',
    content: { type: 'text', value: 'I am your virtual assistant.' },
    role: 'assistant',
    timestamp: new Date(2023, 4, 21, 15, 23),
  },
  {
    id: '2',
    content: { type: 'text', value: 'What does it feel like to be an AI?' },
    role: 'user',
    timestamp: new Date(2023, 4, 21, 15, 23),
  },
];

describe('AvatarControl', () => {
  it('renders an AvatarControl element', () => {
    const result = render(<AvatarControl message={messages[0]} />);
    expect(result.container).toBeDefined();
  });

  it('renders an AvatarControl element with AI username and icon', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <AvatarControl message={messages[0]} />
      </AvatarsProvider>
    );

    const username = screen.queryByText('Raven');
    const avatar = screen.queryByText('RAvatar');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  it('renders an AvatarControl element with user username and icon', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <AvatarControl message={messages[1]} />
      </AvatarsProvider>
    );

    const username = screen.queryByText('Jane Doe');
    const avatar = screen.queryByText('UAvatar');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });
});
