import * as React from 'react';
import { useNonStyleProps, usePropStyles } from '../shared/styleUtils';
import {
  ElementType,
  HTMLElementType,
  PrimitivePropsWithRef,
  ViewProps,
} from '../types';

const ViewPrimitive = <Element extends ElementType = 'div'>(
  {
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
  }: PrimitivePropsWithRef<ViewProps, Element>,
  ref?: React.ForwardedRef<HTMLElementType<Element>>
) => {
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
      ref,
      style: propStyles,
      ...nonStyleProps,
    },
    children
  );
};

export const View = React.forwardRef(ViewPrimitive);

View.displayName = 'View';
