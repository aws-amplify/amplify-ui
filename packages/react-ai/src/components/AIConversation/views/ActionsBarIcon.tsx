import React from 'react';
import { IconElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

const BLOCK_NAME = 'actions-bar';
const _className = `${BLOCK_NAME}__icon`;

export const ActionsBarIcon = React.forwardRef<
  IconElementProps['ref'],
  IconElementProps
>(({ children, className = _className, ...props }, ref) => {
  const Icon = useElement('Icon');
  return (
    <Icon {...props} className={className} ref={ref}>
      {children ?? 'Icon'}
    </Icon>
  );
});

ActionsBarIcon.displayName = 'ActionsBarIcon';
