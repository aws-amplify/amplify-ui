import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { AlertProps } from '../types';
import { View } from '../View';
import { AlertIcon } from './AlertIcon';
import { variant } from 'styled-system';

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variation,
  isDismissible = false,
  onDismiss = () => {},
  withIcon = false,
  title,
  ...rest
}) => {
  return (
    <View
      className={classNames(ComponentClassNames.Alert, className)}
      data-variation={variation}
      {...rest}
    >
      <AlertIcon variation={variation} />
      {children}
    </View>
  );
};
