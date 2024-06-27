import * as React from 'react';
import { ViewProps } from '../../types';

export const Layout = <T extends ViewProps>({
  ariaLabel,
  className,
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <section {...rest} className={``} tabIndex={-1} aria-label={ariaLabel}>
      {children}
    </section>
  );
};
