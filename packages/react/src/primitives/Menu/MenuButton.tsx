import * as React from 'react';
import classNames from 'classnames';
import { Button } from '../Button';

import { classNameModifier } from '../shared/utils';
import {
  BaseMenuButtonProps,
  MenuButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { ComponentClassName } from '@aws-amplify/ui';
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
    isDisabled,
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
  const componentClasses = classNames(
    ComponentClassName.Button,
    classNameModifier(ComponentClassName.Button, size),
    classNameModifier(ComponentClassName.Button, variation),
    className
  );

  return (
    <Button
      ref={ref}
      className={componentClasses}
      disabled={isDisabled ?? isLoading}
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
