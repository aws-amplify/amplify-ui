import React from 'react';
import { useElement } from '../context/elements';
import { IconElementProps } from '@aws-amplify/ui-react/internal';

export const Icon = <T extends IconElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Icon = useElement('Icon');

  return (
    <Icon className={className} {...rest}>
      {children ?? 'default'}
    </Icon>
  );
};
