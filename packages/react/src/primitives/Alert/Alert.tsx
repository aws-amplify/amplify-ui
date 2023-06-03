import * as React from 'react';
import classNames from 'classnames';
import { isFunction } from '@aws-amplify/ui';

import { ComponentClassNames, ComponentText } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
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
import { IconClose } from '../Icon/internal';

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

  const dismissAlert = React.useCallback(() => {
    setDismissed(!dismissed);

    if (isFunction(onDismiss)) {
      onDismiss();
    }
  }, [setDismissed, onDismiss, dismissed]);

  return !dismissed ? (
    <Flex
      className={classNames(
        ComponentClassNames.Alert,
        className,
        classNameModifier(ComponentClassNames.Alert, variation)
      )}
      data-variation={variation}
      ref={ref}
      role="alert"
      {...rest}
    >
      {hasIcon && <AlertIcon variation={variation} ariaHidden />}
      <View flex="1">
        {heading && (
          <View className={ComponentClassNames.AlertHeading}>{heading}</View>
        )}
        <View className={ComponentClassNames.AlertBody}>{children}</View>
      </View>
      {isDismissible && (
        <Button
          ariaLabel={dismissButtonLabel}
          variation="link"
          className={ComponentClassNames.AlertDismiss}
          onClick={dismissAlert}
          ref={buttonRef}
        >
          <IconClose aria-hidden="true" />
        </Button>
      )}
    </Flex>
  ) : null;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/alert)
 */
export const Alert: ForwardRefPrimitive<BaseAlertProps, 'div'> =
  React.forwardRef(AlertPrimitive);

Alert.displayName = 'Alert';
