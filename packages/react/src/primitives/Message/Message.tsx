import * as React from 'react';
import { MessageHeading } from './MessageHeading';
import { MessageIcon } from './MessageIcon';
import { MessageDismiss } from './MessageDismiss';
import { MessageContent } from './MessageContent';
import { MessageContainer } from './MessageContainer';

import {
  MessageProps,
  BaseMessageProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const MessagePrimitive: Primitive<MessageProps, 'div'> = (
  {
    children,
    heading,
    dismissLabel,
    isDismissible,
    onDismiss,
    hasIcon = true,
    colorTheme = 'neutral',
    variation = 'filled',
    ...rest
  },
  ref
) => {
  return (
    <MessageContainer
      colorTheme={colorTheme}
      variation={variation}
      ref={ref}
      {...rest}
    >
      {hasIcon ? <MessageIcon /> : null}
      <MessageContent>
        {heading ? <MessageHeading>{heading}</MessageHeading> : null}
        {children}
      </MessageContent>

      {isDismissible ? (
        <MessageDismiss onDismiss={onDismiss} dismissLabel={dismissLabel} />
      ) : null}
    </MessageContainer>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/message)
 */

export const Message: ForwardRefPrimitive<BaseMessageProps, 'div'> =
  primitiveWithForwardRef(MessagePrimitive);

Message.displayName = 'Message';
