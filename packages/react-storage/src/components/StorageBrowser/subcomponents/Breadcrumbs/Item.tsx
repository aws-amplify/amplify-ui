import * as React from 'react';
import { ViewProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const Item = <T extends ViewProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <li {...rest} className={className}>
      {children}
    </li>
  );
};
