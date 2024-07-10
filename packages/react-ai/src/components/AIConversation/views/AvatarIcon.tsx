import React from 'react';
import { useElement } from '../context/elements';
import { IconElementProps } from '@aws-amplify/ui-react/internal';

const BLOCK_NAME = 'avatar';
const _className = `${BLOCK_NAME}__icon`;

export const AvatarIcon = React.forwardRef<
  IconElementProps['ref'],
  IconElementProps
>(({ children, className = _className, ...props }, ref) => {
  const Icon = useElement('Icon');

  return (
    <Icon className={className} {...props} ref={ref}>
      {children ?? 'avatar icon'}
    </Icon>
  );
});

AvatarIcon.displayName = 'AvatarIcon';
