import React from 'react';
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
  size = 'medium',
  variant = 'default',
  type = 'button',
}) => (
  <View
    aria-label={ariaLabel}
    as="button"
    className={classNames(ComponentClassNames.Button, className)}
    data-fullwidth={isFullWidth}
    data-loading={isLoading}
    data-size={size}
    data-variant={variant}
    disabled={isDisabled || isLoading}
    id={id}
    onClick={onClick}
    type={type}
  >
    {isLoading && loadingText ? <span>{loadingText}</span> : children}
  </View>
);
