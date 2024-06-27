import * as React from 'react';
import { ButtonElementProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const PreviousButton = <T extends ButtonElementProps>({
  ariaLabel = 'Go to previous page',
  onClick = () => {},
  isDisabled = false,
  children,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <button
      {...rest}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {children ?? `<`}
    </button>
  );
};
