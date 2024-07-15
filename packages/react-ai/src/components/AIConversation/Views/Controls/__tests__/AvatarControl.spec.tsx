import React from 'react';
import { render, screen } from '@testing-library/react';
import { AvatarControl } from '../AvatarControl';

const userAvatar = {
  username: 'User',
  avatar: (
    <svg>
      <text x="10" y="20">
        Avatar
      </text>
    </svg>
  ),
};

describe('AvatarControl', () => {
  it('renders an AvatarControl element', () => {
    render(<AvatarControl avatar={userAvatar} />);

    const username = screen.queryByText('User');
    const avatar = screen.queryByText('Avatar');

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });
});
