import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
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
  const componentClasses = classNames(
    ComponentClassNames.Button,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Button, variation),
    classNameModifier(ComponentClassNames.Button, size),
    classNameModifierByFlag(
      ComponentClassNames.Button,
      'disabled',
      isDisabled || isLoading || rest['disabled']
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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/button)
 */
export const Button = React.forwardRef(ButtonPrimitive);

Button.displayName = 'Button';
