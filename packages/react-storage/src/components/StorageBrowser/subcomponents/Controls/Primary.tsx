import * as React from 'react';
import { ViewProps } from '../../types';

export const Primary = <T extends ViewProps>({
  className,
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <div {...rest} className={``}>
      {children}
    </div>
  );
};
