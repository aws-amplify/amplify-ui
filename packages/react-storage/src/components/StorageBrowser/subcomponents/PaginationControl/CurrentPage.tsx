import * as React from 'react';
import { ButtonElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const CurrentPage = <T extends ButtonElementProps>({
  onClick = () => {},
  isDisabled = false,
  children,
  ...rest
}: T): JSX.Element => {
  const Button = useElement('Button');

  return (
    <Button
      {...rest}
      onClick={onClick}
      disabled={isDisabled}
      aria-current="page"
    >
      {children}
    </Button>
  );
};
