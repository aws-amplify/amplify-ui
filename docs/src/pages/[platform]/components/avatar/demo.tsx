import * as React from 'react';
import { Avatar, AvatarProps } from '@aws-amplify/ui-react';

import { AvatarPropControls } from './AvatarPropControls';
import { useAvatarProps } from './useAvatarProps';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

const propsToCode = (avatarProps: AvatarProps) => {
  const { size, variation, colorTheme, src } = avatarProps;
  return (
    `<Avatar` +
    (src ? `\n  src=${JSON.stringify(src)}` : '') +
    (size ? `\n  size=${JSON.stringify(size)}` : '') +
    (colorTheme ? `\n  colorTheme=${JSON.stringify(colorTheme)}` : '') +
    (variation ? `\n  variation=${JSON.stringify(variation)}` : '') +
    `\n/>`
  );
};

const defaultAvatarProps = {
  src: '/cats/1.jpg',
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
      />
    </Demo>
  );
};
