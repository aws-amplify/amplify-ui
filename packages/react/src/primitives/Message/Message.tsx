import * as React from 'react';
import classNames from 'classnames';

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
      setDismissed,
    }),
    [colorTheme, dismissed]
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
          data-variation={variation}
          ref={ref}
          {...rest}
        >
          {children ? children : null}
        </Flex>
      ) : null}
    </MessageContext.Provider>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/message)
 */
export const Message: ForwardRefPrimitive<BaseMessageProps, 'div'> =
  React.forwardRef(MessagePrimitive);

Message.displayName = 'Message';
