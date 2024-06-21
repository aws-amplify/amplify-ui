import * as React from 'react';
import { buttonClasses } from '@aws-amplify/ui';
import { Button } from '../Button';

import {
  BaseMenuButtonProps,
  MenuButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { useStyles } from '../shared/styleUtils';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
const MenuButtonPrimitive: Primitive<MenuButtonProps, 'button'> = (
  {
    ariaLabel,
    className,
    children,
    isDisabled = false,
    isLoading,
    size,
    style,
    type = 'button',
    variation,
    testId,
    ...rest
  },
  ref
) => {
  const { propStyles, nonStyleProps } = useStyles(rest, style);

  return (
    <Button
      ref={ref}
      className={buttonClasses(
        {
          _modifiers: [size, variation],
        },
        [className]
      )}
      disabled={isDisabled || isLoading}
      isDisabled={isDisabled || isLoading}
      type={type}
      testId={testId}
      aria-label={ariaLabel}
      style={propStyles}
      {...nonStyleProps}
    >
      {children}
    </Button>
  );
};

export const MenuButton: ForwardRefPrimitive<BaseMenuButtonProps, 'button'> =
  primitiveWithForwardRef(MenuButtonPrimitive);

MenuButton.displayName = 'MenuButton';
