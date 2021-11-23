import * as React from 'react';
import { useNonStyleProps, usePropStyles } from '../shared/styleUtils';
import {
  ElementType,
  HTMLElementType,
  PrimitivePropsWithRef,
  ViewProps,
} from '../types';

const ViewInner = <Element extends ElementType = 'div'>(
  {
    as = 'div',
    children,
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
      'data-testid': testId,
      disabled: isDisabled,
      ref,
      style: propStyles,
      ...nonStyleProps,
    },
    children
  );
};

export const View = React.forwardRef(ViewInner);

View.displayName = 'View';
