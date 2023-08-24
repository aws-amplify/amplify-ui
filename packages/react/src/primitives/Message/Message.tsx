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

type MessageType = ForwardRefPrimitive<BaseMessageProps, 'div'> & {
  Container: typeof MessageContainer;
  Content: typeof MessageContent;
  Dismiss: typeof MessageDismiss;
  Icon: typeof MessageIcon;
  Heading: typeof MessageHeading;
};

const Message: MessageType = Object.assign(React.forwardRef(MessagePrimitive), {
  Container: MessageContainer,
  Content: MessageContent,
  Dismiss: MessageDismiss,
  Icon: MessageIcon,
  Heading: MessageHeading,
});

Message.displayName = 'Message';

export { Message };
