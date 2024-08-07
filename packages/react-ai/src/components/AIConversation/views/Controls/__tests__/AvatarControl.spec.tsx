import React from 'react';
import { render, screen } from '@testing-library/react';
import { AvatarsProvider } from '../../../context/AvatarsContext';
import { RoleContext } from '../../../context/MessagesContext';
import { AvatarControl } from '../AvatarControl';

const avatars = {
  user: {
    username: 'Jane Doe',
    avatar: <p>UAvatar</p>,
  },
  ai: {
    username: 'Raven',
    avatar: <p>RAvatar</p>,
  },
};

describe('AvatarControl', () => {
  it('renders an AvatarControl element', () => {
    const result = render(<AvatarControl />);
    expect(result.container).toBeDefined();
  });

  it('uses the AI username and icon from AIConversationInput', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <RoleContext.Provider value="assistant">
          <AvatarControl />
        </RoleContext.Provider>
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

  it('uses the user username and icon from AIConversationInput', () => {
    render(
      <AvatarsProvider avatars={avatars}>
        <RoleContext.Provider value="user">
          <AvatarControl />
        </RoleContext.Provider>
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

  it.todo('renders a user avatar by default');

  it('renders a user avatar with default name and icon if none are provided', async () => {
    render(
      <RoleContext.Provider value="user">
        <AvatarControl />
      </RoleContext.Provider>
    );

    const username = await screen.findByText('User');
    const avatar = screen.getByTestId('avatar-icon-user');
    const avatarIcon = avatar.querySelector('svg');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatarIcon).toBeInTheDocument();
  });

  it('renders an AI avatar with default name and icon if none are provided', async () => {
    render(
      <RoleContext.Provider value="assistant">
        <AvatarControl />
      </RoleContext.Provider>
    );

    const username = await screen.findByText('Assistant');
    const avatar = screen.getByTestId('avatar-icon-assistant');
    const avatarIcon = avatar.querySelector('svg');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatarIcon).toBeInTheDocument();
  });
});
