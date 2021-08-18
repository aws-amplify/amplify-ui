import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { AlertProps } from '../types';
import { View } from '../View';

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variation,
  size,
  ...rest
}) => (
  <View
    className={classNames(ComponentClassNames.Alert, className)}
    data-variation={variation}
    data-size={size}
    {...rest}
  >
    {children}
  </View>
);
