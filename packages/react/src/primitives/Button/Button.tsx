import * as React from 'react';
import { createComponentClasses } from '@aws-amplify/ui';

import {
  BaseButtonProps,
  ButtonProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

import { useFieldset } from '../Fieldset/useFieldset';
import { Flex } from '../Flex';
import { Loader } from '../Loader';
import { View } from '../View';

const buttonClassnames = createComponentClasses({ name: 'button' });

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
      ? (`${variation ?? 'outlined'}--${colorTheme}` as const)
      : undefined;

  const { isFieldsetDisabled } = useFieldset();
  const shouldBeDisabled = isFieldsetDisabled
    ? isFieldsetDisabled
    : isDisabled ?? isLoading ?? rest['disabled'];

  const componentClasses = buttonClassnames(
    {
      _modifiers: [
        variation,
        colorThemeModifier,
        size,
        shouldBeDisabled ? 'disabled' : undefined,
        isFullWidth ? 'fullwidth' : undefined,
        isLoading ? 'loading' : undefined,
      ],
    },
    [className]
  );

  return (
    <View
      ref={ref}
      as="button"
      className={componentClasses}
      isDisabled={shouldBeDisabled}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <Flex
          as="span"
          className={buttonClassnames({ _element: 'loader-wrapper' })}
        >
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
  primitiveWithForwardRef(ButtonPrimitive);

Button.displayName = 'Button';
