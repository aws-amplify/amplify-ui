import * as React from 'react';
import { ButtonElementProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const Button = <T extends ButtonElementProps>({
  onClick = () => {},
  children,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <button {...rest} onClick={onClick}>
      {children}
    </button>
  );
};
