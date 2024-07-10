import React from 'react';
import { IconElement as Icon, IconElementProps } from '../types';

const BLOCK_NAME = 'avatar';
const _className = `${BLOCK_NAME}__icon`;

export const AvatarIcon = React.forwardRef<
  IconElementProps['ref'],
  IconElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <Icon className={className} {...props} ref={ref}>
      {children ?? 'avatar icon'}
    </Icon>
  );
});

AvatarIcon.displayName = 'AvatarIcon';
