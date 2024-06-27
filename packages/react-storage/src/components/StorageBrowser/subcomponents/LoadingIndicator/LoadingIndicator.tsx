import * as React from 'react';
import { ViewProps } from '../../types';

export const LoadingIndicator = <T extends ViewProps>({
  className,
  children,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <div aria-atomic="true" aria-live="polite" {...rest}>
      {children ?? 'loading...'}
    </div>
  );
};
