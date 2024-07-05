import * as React from 'react';
import { NavElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Container = <T extends NavElementProps>({
  ariaLabel: _ariaLabel,
  className: _className,
  children,
  ...rest
}: T): JSX.Element => {
  const ariaLabel = _ariaLabel ?? 'Pagination';
  const Nav = useElement('Nav');
  const baseClassName = 'amplify-storagebrowser__pagination';
  const className = _className ?? baseClassName;
  return (
    <Nav {...rest} aria-label={ariaLabel} className={className}>
      {children}
    </Nav>
  );
};
