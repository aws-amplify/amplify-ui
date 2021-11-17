import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { AlertProps, Primitive } from '../types';
import { View } from '../View';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Button } from '../Button';
import { AlertIcon } from './AlertIcon';
import { IconClose } from '../Icon';
import { isFunction } from '../shared/utils';

export const Alert: Primitive<AlertProps, typeof Flex> = ({
  alignContent,
  alignItems = 'center',
  children,
  className,
  direction,
  gap,
  hasIcon = true,
  heading,
  iconSize,
  isDismissible = false,
  justifyContent = 'space-between',
  onDismiss,
  variation,
  wrap,
  ...rest
}) => {
  const [dismissed, setDismissed] = React.useState<boolean>(false);

  const dismissAlert = React.useCallback(() => {
    setDismissed(!dismissed);

    if (isFunction(onDismiss)) {
      onDismiss();
    }
  }, [setDismissed, onDismiss]);

  return (
    !dismissed && (
      <Flex
        alignContent={alignContent}
        alignItems={alignItems}
        className={classNames(ComponentClassNames.Alert, className)}
        data-variation={variation}
        direction={direction}
        gap={gap}
        justifyContent={justifyContent}
        wrap={wrap}
        {...rest}
      >
        {hasIcon && <AlertIcon variation={variation} />}
        <View role="alert" flex="1">
          {heading && (
            <View className={ComponentClassNames.AlertHeading}>{heading}</View>
          )}
          <View className={ComponentClassNames.AlertBody}>{children}</View>
        </View>
        {isDismissible && (
          <Button
            variation="link"
            className={ComponentClassNames.AlertDismiss}
            onClick={dismissAlert}
          >
            <IconClose size={iconSize} />
          </Button>
        )}
      </Flex>
    )
  );
};

Alert.displayName = 'Alert';
