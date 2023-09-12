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

import { useFieldset } from '../Fieldset/useFieldset';
import { Flex } from '../Flex';
import { Loader } from '../Loader';
import { View } from '../View';

// These variations support colorThemes. 'undefined' accounts for our
// 'default' variation which is not named.
const supportedVariations = ['link', 'primary', undefined];

const ButtonPrimitive: Primitive<ButtonProps, 'button'> = (
  {
    className,
    children,
    colorTheme,
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
  // Creates our colorTheme modifier string based on if the variation
  // supports colorThemes and a colorTheme is used.
  const colorThemeModifier =
    supportedVariations.includes(variation) && colorTheme
      ? `${variation ?? 'outlined'}--${colorTheme}`
      : undefined;

  const { isFieldsetDisabled } = useFieldset();
  const shouldBeDisabled = isFieldsetDisabled
    ? isFieldsetDisabled
    : isDisabled ?? isLoading ?? rest['disabled'];

  const componentClasses = classNames(
    ComponentClassNames.Button,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Button, variation),
    classNameModifier(ComponentClassNames.Button, colorThemeModifier),
    classNameModifier(ComponentClassNames.Button, size),
    classNameModifierByFlag(
      ComponentClassNames.Button,
      'disabled',
      shouldBeDisabled
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
      isDisabled={shouldBeDisabled}
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
