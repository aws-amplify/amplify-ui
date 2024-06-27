import * as React from 'react';
import { LabelProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const FieldLabel = <T extends LabelProps>({
  children,
  className,
  htmlFor,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <label htmlFor={htmlFor} className={className} {...rest}>
      {children ?? 'Filter folders and files'}
    </label>
  );
};
