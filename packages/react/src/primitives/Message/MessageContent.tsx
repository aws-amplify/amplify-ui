import * as React from 'react';
import { messageClasses } from '@aws-amplify/ui';

import {
  MessageContentProps,
  BaseMessageContentProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const MessageContentPrimitive: Primitive<MessageContentProps, 'div'> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <Flex
      className={messageClasses({ _element: 'content' }, [className])}
      ref={ref}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const MessageContent: ForwardRefPrimitive<
  BaseMessageContentProps,
  'div'
> = primitiveWithForwardRef(MessageContentPrimitive);

MessageContent.displayName = 'MessageContent';
