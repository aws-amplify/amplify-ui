import * as React from 'react';
import classNames from 'classnames';
import { Button } from '../Button';

import { classNameModifier } from '../shared/utils';
import { ButtonProps, PrimitiveProps } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { useStyles } from '../shared/styleUtils';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/menu)
 */
export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  PrimitiveProps<ButtonProps, 'button'>
>(
  (
    {
      ariaLabel,
      className,
      children,
      isFullWidth = false,
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
      ComponentClassNames.Button,
      classNameModifier(ComponentClassNames.Button, size),
      classNameModifier(ComponentClassNames.Button, variation),
      className
    );

    return (
      <Button
        ref={ref}
        className={componentClasses}
        data-fullwidth={isFullWidth}
        data-loading={isLoading}
        data-size={size}
        data-variation={variation}
        disabled={isDisabled || isLoading}
        type={type}
        data-testid={testId}
        aria-label={ariaLabel}
        style={propStyles}
        {...nonStyleProps}
      >
        {children}
      </Button>
    );
  }
);

MenuButton.displayName = 'MenuButton';
