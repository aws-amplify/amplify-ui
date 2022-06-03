import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { Button } from '../Button';
import { ComponentClassNames } from '../shared/constants';
import { ToggleButtonProps, Primitive } from '../types';
import { useToggleButton } from './useToggleButton';

const ToggleButtonPrimitive: Primitive<ToggleButtonProps, typeof Button> = (
  {
    className,
    children,
    defaultPressed = false,
    isDisabled,
    isPressed: isPressedProp,
    onChange,
    onClick,
    size,
    value,
    variation,
    ...rest
  },
  ref
) => {
  const { isPressed, handleClick } = useToggleButton({
    isPressed: isPressedProp,
    defaultPressed,
    onChange,
    onClick,
    value,
  });
  const componentClasses = classNames(
    ComponentClassNames.ToggleButton,
    classNameModifier(ComponentClassNames.ToggleButton, variation),
    classNameModifierByFlag(
      ComponentClassNames.ToggleButton,
      'pressed',
      isPressed
    ),
    className
  );

  return (
    <Button
      aria-pressed={isPressed}
      className={componentClasses}
      isDisabled={isDisabled}
      onClick={handleClick}
      ref={ref}
      size={size}
      type="button"
      variation={variation}
      {...rest}
    >
      {children}
    </Button>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/togglebutton)
 */
export const ToggleButton = React.forwardRef(ToggleButtonPrimitive);

ToggleButton.displayName = 'ToggleButton';
