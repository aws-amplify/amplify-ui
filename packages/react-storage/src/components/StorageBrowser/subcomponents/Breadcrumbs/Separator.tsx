import * as React from 'react';
import { ViewProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const Separator = <T extends ViewProps>({
  children,
  className,
  ariaHidden = true,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <div className={className} {...rest} aria-hidden={ariaHidden}>
      {children ?? '>'}
    </div>
  );
};
