import React from 'react';
import { useNonStyleProps, usePropStyles } from '../shared/styleUtils';
import { ElementType, PrimitiveProps, ViewProps } from '../types';

export const View = <Element extends ElementType = 'div'>({
  as = 'div',
  className,
  children,
  role,
  id,
  testId,
  ariaLabel,
  isDisabled,
  style,
  ...rest
}: PrimitiveProps<ViewProps, Element>) => {
  const propStyles = usePropStyles(rest, style);
  const nonStyleProps = useNonStyleProps(rest);

  return React.createElement(
    as,
    {
      'aria-label': ariaLabel,
      className,
      'data-testid': testId,
      disabled: isDisabled,
      id,
      role,
      style: propStyles,
      ...nonStyleProps,
    },
    children
  );
};

<View fontWeight="400"></View>;
