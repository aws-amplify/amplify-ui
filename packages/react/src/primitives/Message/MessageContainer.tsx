import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { classNameModifier } from '../shared/utils';
import {
  MessageContainerProps,
  BaseMessageContainerProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';
import { MessageContext } from './useMessageContext';

const MessageContainerPrimitive: Primitive<MessageContainerProps, 'div'> = (
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
          ref={ref}
          {...rest}
        >
          {children}
        </Flex>
      ) : null}
    </MessageContext.Provider>
  );
};

export const MessageContainer: ForwardRefPrimitive<
  BaseMessageContainerProps,
  'div'
> = React.forwardRef(MessageContainerPrimitive);

MessageContainer.displayName = 'MessageContainer';
