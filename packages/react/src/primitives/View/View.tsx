import * as React from 'react';
import { useStyles } from '../shared/styleUtils';
import { ForwardRefPrimitive, ViewProps, Primitive } from '../types';

const ViewPrimitive: Primitive<ViewProps, 'div'> = (
  { as = 'div', children, testId, ariaLabel, isDisabled, style, ...rest },
  ref
) => {
  const { propStyles, nonStyleProps } = useStyles(rest, style);

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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/view)
 */
export const View: ForwardRefPrimitive<ViewProps, 'div'> =
  React.forwardRef(ViewPrimitive);

View.displayName = 'View';
