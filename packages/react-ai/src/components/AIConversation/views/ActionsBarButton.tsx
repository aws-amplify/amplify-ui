import React from 'react';
import { ButtonElement as Button, ButtonElementProps } from '../types';

const BLOCK_NAME = 'actions-bar';
const _className = `${BLOCK_NAME}__button`;

export const ActionsBarButton = React.forwardRef<
  ButtonElementProps['ref'],
  ButtonElementProps
>(
  (
    {
      children,
      className = _className,
      disabled = false,
      type = 'submit',
      ...props
    },
    ref
  ) => {
    return (
      <Button
        {...props}
        className={className}
        disabled={disabled}
        ref={ref}
        type={type}
      >
        {children ?? 'Action'}
      </Button>
    );
  }
);

ActionsBarButton.displayName = 'ActionsBarButton';
