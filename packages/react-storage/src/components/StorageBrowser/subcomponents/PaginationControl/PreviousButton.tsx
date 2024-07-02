import * as React from 'react';
import { ButtonElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const PreviousButton = <T extends ButtonElementProps>({
  ariaLabel = 'Go to previous page',
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
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {children ?? `<`}
    </Button>
  );
};
