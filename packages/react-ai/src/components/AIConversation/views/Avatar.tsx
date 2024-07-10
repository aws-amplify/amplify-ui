import React from 'react';
import { AvatarContainer } from './AvatarContainer';
import { AvatarDisplayName } from './AvatarDisplayName';
import { AvatarIcon } from './AvatarIcon';

export function Avatar(): JSX.Element {
  return (
    <AvatarContainer>
      <AvatarIcon />
      <AvatarDisplayName />
    </AvatarContainer>
  );
}

Avatar.Container = AvatarContainer;
Avatar.DisplayName = AvatarDisplayName;
Avatar.Icon = AvatarIcon;
