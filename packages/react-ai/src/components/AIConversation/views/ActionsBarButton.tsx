import React from 'react';
import { ButtonElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

export const ActionsBarButton = <T extends ButtonElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Button = useElement('Button');
  return (
    <Button className={className} {...rest}>
      {children}
    </Button>
  );
};
