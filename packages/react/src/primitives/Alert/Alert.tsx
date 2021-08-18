import React, { useState } from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { AlertProps } from '../types';
import { View } from '../View';
import { AlertIcon } from './AlertIcon';
import { IconClose } from '../Icon';

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variation,
  isDismissible = false, // change to 'false' after testing
  onDismiss = () => {},
  withIcon = true,
  title = null,
  ...rest
}) => {
  const [dismissed, setDismissed] = useState(false);

  const dismissAlert = () => {
    console.log('clicked dismiss');
    setDismissed(!dismissed);
    onDismiss();
  };

  return (
    !dismissed && (
      <View
        className={classNames(ComponentClassNames.Alert, className)}
        data-variation={variation}
        {...rest}
      >
        {withIcon && <AlertIcon variation={variation} />}
        {title}
        {children}
        {isDismissible && <IconClose onClick={dismissAlert} />}
      </View>
    )
  );
};
