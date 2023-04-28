import * as React from 'react';
import classNames from 'classnames';
import { isFunction } from '@aws-amplify/ui';

import { ComponentClassNames, ComponentText } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
import { MessageProps, Primitive } from '../types';
import { View } from '../View';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { MessageIcon } from './MessageIcon';
import { IconClose } from '../Icon/internal';

const MessagePrimitive: Primitive<MessageProps, typeof Flex> = (
  {
    buttonRef,
    children,
    className,
    dismissButtonLabel = ComponentText.Alert.dismissButtonLabel,
    hasIcon = true,
    icon,
    heading,
    actions,
    isDismissible = false,
    onDismiss,
    colorTheme = 'neutral',
    variation = 'plain',
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
  console.log(icon);

  return !dismissed ? (
    <Flex
      className={classNames(
        ComponentClassNames.Message,
        className,
        classNameModifier(ComponentClassNames.Message, variation),
        classNameModifier(ComponentClassNames.Message, colorTheme)
      )}
      data-variation={variation}
      ref={ref}
      {...rest}
    >
      {hasIcon ? <MessageIcon severity={colorTheme} ariaHidden /> : null}
      {icon ? <div>{icon}</div> : null}

      <Flex className={ComponentClassNames.MessageContent}>
        {heading && (
          <View className={ComponentClassNames.MessageHeading}>{heading}</View>
        )}
        {children ? (
          <View className={ComponentClassNames.MessageBody}>{children}</View>
        ) : null}
      </Flex>
      {actions ? <View>{actions}</View> : null}
      {isDismissible && (
        <Button
          ariaLabel={dismissButtonLabel}
          variation="link"
          colorTheme="neutral"
          className={ComponentClassNames.MessageDismiss}
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
export const Message = React.forwardRef(MessagePrimitive);

Message.displayName = 'Message';
