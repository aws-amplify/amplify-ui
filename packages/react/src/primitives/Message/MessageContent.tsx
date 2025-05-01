import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';
import type {
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
      className={classNames(ComponentClassName.MessageContent, className)}
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
