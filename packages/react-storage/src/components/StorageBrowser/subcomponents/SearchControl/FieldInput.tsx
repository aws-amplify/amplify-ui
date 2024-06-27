import * as React from 'react';
import { InputProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const FieldInput = <T extends InputProps>({
  className,
  id,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return <input type="text" id={id} className={className} {...rest} />;
};
