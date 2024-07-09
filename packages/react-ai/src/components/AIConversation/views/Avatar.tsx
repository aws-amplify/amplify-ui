import React from 'react';
import { AvatarContainer } from './AvatarContainer';
import { AvatarDisplayName } from './AvatarDisplayName';
import { AvatarIcon } from './AvatarIcon';

// ControlBlock
function AvatarElement() {
  return (
    <AvatarContainer>
      <AvatarIcon />
      <AvatarDisplayName />
    </AvatarContainer>
  );
}

const Avatar = Object.assign(AvatarElement, {
  AvatarContainer,
  AvatarDisplayName,
  AvatarIcon,
});

export { Avatar };
