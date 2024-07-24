import React from 'react';
import { render, screen } from '@testing-library/react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { ConversationMessage } from '../../../types';
import { IconElement } from '../../../context/elements/IconElement';
import { AvatarsProvider } from '../../../context/AvatarsContext';
import { AvatarControl } from '../AvatarControl';

const avatars = {
  user: {
    username: 'Jane Doe',
    avatar: (
      <text x="10" y="20">
        UAvatar
      </text>
    ),
  },
  ai: {
    username: 'Raven',
    avatar: (
      <text x="10" y="20">
        RAvatar
      </text>
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

  it('renders an AvatarControl element with provided AI username and icon', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <AvatarControl message={messages[0]} />
      </AvatarsProvider>
    );

    const username = screen.queryByText('Raven');
    const avatar = screen.getByTestId('avatar-icon-assistant');
    const avatarContent = screen.getByText('RAvatar');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatarContent).toBeInTheDocument();
  });

  it('renders an AvatarControl element with provided user username and icon', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <AvatarControl message={messages[1]} />
      </AvatarsProvider>
    );

    const username = screen.queryByText('Jane Doe');
    const avatar = screen.getByTestId('avatar-icon-user');
    const avatarContent = screen.getByText('UAvatar');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatarContent).toBeInTheDocument();
  });

  it('renders an AvatarControl element with defaults if no user avatar is provided', async () => {
    render(<AvatarControl message={messages[1]} />);

    const username = await screen.findByText('User');
    const avatar = screen.getByTestId('avatar-icon-user');
    const avatarIcon = avatar.querySelector('svg');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatarIcon).toBeInTheDocument();
  });

  it('renders an AvatarControl element with defaults if no AI avatar is provided', async () => {
    render(<AvatarControl message={messages[0]} />);

    const username = await screen.findByText('Assistant');
    const avatar = screen.getByTestId('avatar-icon-assistant');
    const avatarIcon = avatar.querySelector('svg');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatarIcon).toBeInTheDocument();
  });
});
