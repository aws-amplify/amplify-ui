import * as React from 'react';
import classNames from 'classnames';
import { MessageHeading } from './MessageHeading';
import { MessageIcon } from './MessageIcon';
import { MessageDismiss } from './MessageDismiss';
import { MessageContent } from './MessageContent';

import { ComponentClassNames } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
import {
  MessageProps,
  BaseMessageProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { MessageContext } from './useMessageContext';
import { Flex } from '../Flex';

const MessagePrimitive: Primitive<MessageProps, typeof Flex> = (
  {
    children,
    className,
    heading,
    content,
    dismissButtonLabel,
    isDismissible,
    onDismiss,
    hasIcon = true,
    colorTheme = 'neutral',
    variation = 'filled',
    ...rest
  },
  ref
) => {
  const [dismissed, setDismissed] = React.useState<boolean>(false);

  const value = React.useMemo(
    () => ({
      colorTheme,
      dismissed,
      onDismiss,
      setDismissed,
    }),
    [colorTheme, dismissed, onDismiss]
  );

  return (
    <MessageContext.Provider value={value}>
      {!dismissed ? (
        <Flex
          className={classNames(
            ComponentClassNames.Message,
            classNameModifier(ComponentClassNames.Message, variation),
            classNameModifier(ComponentClassNames.Message, colorTheme),
            className
          )}
          ref={ref}
          {...rest}
        >
          {children ? (
            children
          ) : (
            <>
              {hasIcon ? <MessageIcon /> : null}
              {heading || content ? (
                <MessageContent>
                  {heading ? <MessageHeading>{heading}</MessageHeading> : null}
                  {content ? content : null}
                </MessageContent>
              ) : null}
              {isDismissible ? (
                <MessageDismiss dismissButtonLabel={dismissButtonLabel} />
              ) : null}
            </>
          )}
        </Flex>
      ) : null}
    </MessageContext.Provider>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/message)
 */

type MessageType = ForwardRefPrimitive<BaseMessageProps, 'div'> & {
  Content: typeof MessageContent;
  Dismiss: typeof MessageDismiss;
  Icon: typeof MessageIcon;
  Heading: typeof MessageHeading;
};

const Message: MessageType = Object.assign(React.forwardRef(MessagePrimitive), {
  Content: MessageContent,
  Dismiss: MessageDismiss,
  Icon: MessageIcon,
  Heading: MessageHeading,
});

Message.displayName = 'Message';

export { Message };
