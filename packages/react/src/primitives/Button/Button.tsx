import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { ButtonProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const ButtonInner: PrimitiveWithForwardRef<ButtonProps, 'button'> = (
  {
    className,
    children,
    isFullWidth = false,
    isDisabled,
    isLoading,
    loadingText = '',
    size,
    type = 'button',
    variation,
    ...rest
  },
  ref
) => {
  return (
    <View
      ref={ref}
      as="button"
      className={classNames(
        ComponentClassNames.Button,
        ComponentClassNames.FieldGroupControl,
        className
      )}
      data-fullwidth={isFullWidth}
      data-loading={isLoading}
      data-size={size}
      data-variation={variation}
      isDisabled={isDisabled || isLoading}
      type={type}
      {...rest}
    >
      {isLoading && loadingText ? <span>{loadingText}</span> : children}
    </View>
  );
};

export const Button = React.forwardRef(ButtonInner);

Button.displayName = 'Button';
