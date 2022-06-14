import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
import { AlertProps, Primitive } from '../types';
import { View } from '../View';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { AlertIcon } from './AlertIcon';
import { IconClose } from '../Icon/internal';
import { isFunction } from '../shared/utils';

const AlertPrimitive: Primitive<AlertProps, typeof Flex> = (
  {
    buttonRef,
    children,
    className,
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

  return (
    !dismissed && (
      <Flex
        className={classNames(
          ComponentClassNames.Alert,
          className,
          classNameModifier(ComponentClassNames.Alert, variation)
        )}
        data-variation={variation}
        ref={ref}
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
            ref={buttonRef}
          >
            <IconClose />
          </Button>
        )}
      </Flex>
    )
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/alert)
 */
export const Alert = React.forwardRef(AlertPrimitive);

Alert.displayName = 'Alert';
