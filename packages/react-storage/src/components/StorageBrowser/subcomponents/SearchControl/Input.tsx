import * as React from 'react';
import { InputElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Input = <T extends InputElementProps>({
  type = 'text',
  className,
  ...rest
}: T): JSX.Element => {
  const Input = useElement('Input');

  return <Input className={className} {...rest} type={type} />;
};
