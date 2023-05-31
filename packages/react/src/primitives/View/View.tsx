import * as React from 'react';
import { useStyles } from '../shared/styleUtils';
import { ForwardRefPrimitive, BaseViewProps, Primitive } from '../types';

const ViewPrimitive: Primitive<BaseViewProps, 'div'> = (
  {
    as = 'div',
    children,
    testId,
    ariaLabel,
    isDisabled,
    style,
    inert,
    ...rest
  },
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
      inert: inert ? '' : null,
      style: propStyles,
      ...nonStyleProps,
    },
    children
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/view)
 */
export const View = React.forwardRef(ViewPrimitive) as ForwardRefPrimitive<
  BaseViewProps,
  'div'
>;

View.displayName = 'View';
