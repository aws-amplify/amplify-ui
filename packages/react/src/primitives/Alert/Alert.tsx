import React, { useState } from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { AlertProps } from '../types';
import { View } from '../View';
import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { Button } from '../Button';
import { AlertIcon } from './AlertIcon';
import { IconClose } from '../Icon';

export const Alert: React.FC<AlertProps> = ({
  className,
  children,
  variation,
  isDismissible = false,
  onDismiss = () => {},
  withIcon = true,
  title,
  ...rest
}) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  const dismissAlert = () => {
    setDismissed(!dismissed);
    onDismiss();
  };

  return (
    !dismissed && (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        className={classNames(ComponentClassNames.Alert, className)}
        data-variation={variation}
        {...rest}
      >
        <Flex alignItems="center">
          {withIcon && <AlertIcon variation={variation} />}
          <View>
            {title && <Heading color="inherit">{title}</Heading>}
            {children}
          </View>
        </Flex>
        {isDismissible && (
          <Button variation="link" onClick={dismissAlert}>
            <IconClose size="large" />
          </Button>
        )}
      </Flex>
    )
  );
};
