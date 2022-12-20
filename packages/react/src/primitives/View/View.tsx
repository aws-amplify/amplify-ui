import * as React from 'react';
import { useStyles } from '../shared/styleUtils';
import {
  ElementType,
  HTMLElementType,
  PrimitivePropsWithRef,
  ViewProps,
} from '../types';

const ViewPrimitive = <Element extends ElementType = 'div'>(
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
  const { propStyles, nonStyleProps } = useStyles(rest, style);

  // No need to do extra work on style props when it is not rendered as a HTML element
  // e.g. <Image as={NextImage} src="" width={300} height={300} />, just let all props pass to NextImage
  const _rest =
    typeof as === 'string'
      ? {
          style: propStyles,
          ...nonStyleProps,
        }
      : {
          style,
          ...rest,
        };

  return React.createElement(
    as,
    {
      'aria-label': ariaLabel,
      'data-testid': testId,
      disabled: isDisabled,
      ref,
      ..._rest,
    },
    children
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/view)
 */
export const View = React.forwardRef(ViewPrimitive);

View.displayName = 'View';
