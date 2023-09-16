import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  MessageContentProps,
  BaseMessageContentProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';

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
> = React.forwardRef(MessageContentPrimitive);

MessageContent.displayName = 'MessageContent';
