import * as React from 'react';
import { ButtonElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const CurrentPage = <T extends ButtonElementProps>({
  className,
  onClick,
  isDisabled = false,
  children,
  ...rest
}: T): JSX.Element => {
  const Button = useElement('Button');

  return (
    <Button
      className={className}
      {...rest}
      onClick={onClick}
      disabled={isDisabled}
      aria-current="page"
    >
      {children ?? '1'}
    </Button>
  );
};
