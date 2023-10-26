import * as React from 'react';
import classNames from 'classnames';
import { ComponentClassName, isFunction } from '@aws-amplify/ui';

import { ComponentText } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import {
  AlertProps,
  BaseAlertProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { AlertIcon } from './AlertIcon';
import { IconClose, useIcons } from '../Icon';

const AlertPrimitive: Primitive<AlertProps, 'div'> = (
  {
    buttonRef,
    children,
    className,
    dismissButtonLabel = ComponentText.Alert.dismissButtonLabel,
    hasIcon = true,
    heading,
    isDismissible = false,
    onDismiss,
    variation,
    ...rest
  },
  ref
) => {
  const [dismissed, setDismissed] = React.useState<boolean>(false);
  const icons = useIcons('alert');

  const dismissAlert = React.useCallback(() => {
    setDismissed(!dismissed);

    if (isFunction(onDismiss)) {
      onDismiss();
    }
  }, [setDismissed, onDismiss, dismissed]);

  return !dismissed ? (
    <Flex
      className={classNames(
        ComponentClassName.Alert,
        className,
        classNameModifier(ComponentClassName.Alert, variation)
      )}
      ref={ref}
      role="alert"
      {...rest}
    >
      {hasIcon && <AlertIcon variation={variation} ariaHidden />}
      <View flex="1">
        {heading && (
          <View className={ComponentClassName.AlertHeading}>{heading}</View>
        )}
        <View className={ComponentClassName.AlertBody}>{children}</View>
      </View>
      {isDismissible && (
        <Button
          ariaLabel={dismissButtonLabel}
          variation="link"
          className={ComponentClassName.AlertDismiss}
          onClick={dismissAlert}
          ref={buttonRef}
        >
          {icons?.close ?? <IconClose aria-hidden="true" />}
        </Button>
      )}
    </Flex>
  ) : null;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/alert)
 */
export const Alert: ForwardRefPrimitive<BaseAlertProps, 'div'> =
  primitiveWithForwardRef(AlertPrimitive);

Alert.displayName = 'Alert';
