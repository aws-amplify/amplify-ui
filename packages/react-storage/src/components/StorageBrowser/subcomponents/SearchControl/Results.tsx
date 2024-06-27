import * as React from 'react';
import { ViewProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const Results = <T extends ViewProps>({
  children,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <div {...rest} aria-live="polite">
      {children}
    </div>
  );
};
