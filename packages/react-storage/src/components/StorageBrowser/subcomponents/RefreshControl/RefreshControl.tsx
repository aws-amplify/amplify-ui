import * as React from 'react';
import { ButtonElementProps } from '../../types';
import { Icon } from './Icon';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const RefreshControl = <T extends ButtonElementProps>({
  onClick = () => {},
  ariaLabel = 'Refresh list',
  isDisabled = false,
  children,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {children ?? <Icon />}
    </button>
  );
};
