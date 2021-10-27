import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { useNonStyleProps, usePropStyles } from '../shared/styleUtils';
import { ButtonProps, Primitive } from '../types';

export const MenuButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children?: React.ReactNode }
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
