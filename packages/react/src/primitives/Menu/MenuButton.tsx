import * as React from 'react';
import classNames from 'classnames';

import { ButtonProps, PrimitiveProps } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { useNonStyleProps, usePropStyles } from '../shared/styleUtils';

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
      loadingText = '',
      size,
      id,
      role,
      style,
      type = 'button',
      variation,
      testId,
      ...rest
    },
    ref
  ) => {
    const propStyles = usePropStyles(rest, style);
    const nonStyleProps = useNonStyleProps(rest);

    return (
      <button
        ref={ref}
        className={classNames(
          ComponentClassNames.Button,
          ComponentClassNames.FieldGroupControl,
          className
        )}
        data-fullwidth={isFullWidth}
        data-loading={isLoading}
        data-size={size}
        data-variation={variation}
        disabled={isDisabled || isLoading}
        type={type}
        data-testid={testId}
        aria-label={ariaLabel}
        id={id}
        role={role}
        style={propStyles}
        {...nonStyleProps}
      >
        {children}
      </button>
    );
  }
);
