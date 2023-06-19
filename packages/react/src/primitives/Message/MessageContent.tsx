import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  MessageContentProps,
  BaseMessageContentProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';

const MessageContentPrimitive: Primitive<MessageContentProps, typeof Flex> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <Flex
      className={classNames(ComponentClassNames.MessageContent, className)}
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
