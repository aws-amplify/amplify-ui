import * as React from 'react';
import { ButtonElementProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const SubmitButton = <T extends ButtonElementProps>({
  onClick = () => {},
  isDisabled = false,
  children,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <button {...rest} onClick={onClick} disabled={isDisabled}>
      {children ?? 'Submit'}
    </button>
  );
};
