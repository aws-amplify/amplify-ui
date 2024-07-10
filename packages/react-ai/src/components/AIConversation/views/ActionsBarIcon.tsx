import React from 'react';
import { IconElement as Icon, IconElementProps } from '../types';

const BLOCK_NAME = 'actions-bar';
const _className = `${BLOCK_NAME}__icon`;

export const ActionsBarIcon = React.forwardRef<
  IconElementProps['ref'],
  IconElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <Icon {...props} className={className} ref={ref}>
      {children ?? 'Icon'}
    </Icon>
  );
});

ActionsBarIcon.displayName = 'ActionsBarIcon';
