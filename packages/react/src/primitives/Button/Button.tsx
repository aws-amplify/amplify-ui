import classNames from 'classnames';
import * as React from 'react';

import { ButtonProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { Loader } from '../Loader';
import { View } from '../View';

const ButtonPrimitive: Primitive<ButtonProps, 'button'> = (
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
      {isLoading && loadingText ? (
        <Flex as="span" className={ComponentClassNames.ButtonLoaderWrapper}>
          <Loader size={size} />
          {loadingText}
        </Flex>
      ) : (
        children
      )}
    </View>
  );
};

export const Button = React.forwardRef(ButtonPrimitive);

Button.displayName = 'Button';
