import * as React from 'react';
import { HeadingProps } from '../../types';

// import { usePrimitive } from '@aws-amplify/ui-react';

export const Title = <T extends HeadingProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <h2 className={className} {...rest}>
      {children}
    </h2>
  );
};
