import * as React from 'react';
import { Avatar } from '@aws-amplify/ui-react';

import { AvatarPropControls } from './AvatarPropControls';
import { useAvatarProps } from './useAvatarProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (avatarProps) => {
  return (
    `<Avatar` +
    (avatarProps.size ? `\n  size=${JSON.stringify(avatarProps.size)}` : '') +
    (avatarProps.variation
      ? `\n  variation=${JSON.stringify(avatarProps.variation)}`
      : '') +
    `>
  ${avatarProps.body}
</Avatar>`
  );
};

const defaultAvatarProps = {
  src: '/cats/1.jpg',
  body: '',
};

export const AvatarDemo = () => {
  const avatarProps = useAvatarProps(
    demoState.get(Avatar.displayName) || defaultAvatarProps
  );

  return (
    <Demo
      code={propsToCode(avatarProps)}
      propControls={<AvatarPropControls {...avatarProps} />}
    >
      <Avatar
        size={avatarProps.size}
        variation={avatarProps.variation}
        colorTheme={avatarProps.colorTheme}
        src={avatarProps.src.length ? avatarProps.src : undefined}
      >
        {avatarProps.body.length ? avatarProps.body : null}
      </Avatar>
    </Demo>
  );
};
