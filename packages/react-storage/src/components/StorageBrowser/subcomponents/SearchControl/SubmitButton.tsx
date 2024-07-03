import * as React from 'react';
import { ButtonElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const SubmitButton = <T extends ButtonElementProps>({
  type = 'submit',
  className,
  onClick,
  isDisabled = false,
  children = 'Filter locations',
  ...rest
}: T): JSX.Element => {
  const Button = useElement('Button');

  return (
    <Button
      className={className}
      {...rest}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {children}
    </Button>
  );
};
