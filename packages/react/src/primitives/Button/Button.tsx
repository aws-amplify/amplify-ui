import classNames from 'classnames';
import { ComponentClassNames } from '../shared/constants';
import { ButtonProps, Primitive } from '../types';
import { View } from '../View';

export const Button: Primitive<ButtonProps, 'button'> = ({
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
}) => (
  <View
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

Button.displayName = 'Button';
