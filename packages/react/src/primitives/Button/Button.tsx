import * as React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { ButtonProps } from '../types';
import classNames from 'classnames';
import { View } from '../View';

export const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  className = '',
  children,
  isFullWidth = false,
  isDisabled,
  isLoading,
  id,
  loadingText = '',
  onClick = () => {},
  size,
  variation,
  type = 'button',
}) => (
  <View
    aria-label={ariaLabel}
    as="button"
    className={classNames(ComponentClassNames.Button, className)}
    data-fullwidth={isFullWidth}
    data-loading={isLoading}
    data-size={size}
    data-variation={variation}
    disabled={isDisabled || isLoading}
    id={id}
    onClick={onClick}
    type={type}
  >
    {isLoading && loadingText ? <span>{loadingText}</span> : children}
  </View>
);
