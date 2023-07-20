import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import {
  BaseButtonProps,
  ButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
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
    variation = 'outlined',
    colorTheme,
    ...rest
  },
  ref
) => {
  // These variations support colorThemes
  const supportsColorThemes = ['outlined', 'link', 'primary'];

  const componentClasses = classNames(
    ComponentClassNames.Button,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Button, variation),
    // Check if variation supports colorThemes before applying
    // colorTheme modifying class.
    supportsColorThemes.includes(variation) &&
      colorTheme &&
      classNameModifier(
        ComponentClassNames.Button,
        `${variation}--${colorTheme}`
      ),
    classNameModifier(ComponentClassNames.Button, size),
    classNameModifierByFlag(
      ComponentClassNames.Button,
      'disabled',
      isDisabled ?? isLoading ?? rest['disabled']
    ),
    classNameModifierByFlag(ComponentClassNames.Button, 'loading', isLoading),
    classNameModifierByFlag(
      ComponentClassNames.Button,
      'fullwidth',
      isFullWidth
    ),
    className
  );

  return (
    <View
      ref={ref}
      as="button"
      className={componentClasses}
      data-fullwidth={isFullWidth}
      data-loading={isLoading}
      data-size={size}
      data-variation={variation}
      isDisabled={isDisabled ?? isLoading}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <Flex as="span" className={ComponentClassNames.ButtonLoaderWrapper}>
          <Loader size={size} />
          {loadingText ? loadingText : null}
        </Flex>
      ) : (
        children
      )}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/button)
 */
export const Button: ForwardRefPrimitive<BaseButtonProps, 'button'> =
  React.forwardRef(ButtonPrimitive);

Button.displayName = 'Button';
