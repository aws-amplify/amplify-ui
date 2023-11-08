import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  MessageHeadingProps,
  BaseMessageHeadingProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const MessageHeadingPrimitive: Primitive<MessageHeadingProps, 'div'> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <Flex
      className={classNames(ComponentClassName.MessageHeading, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const MessageHeading: ForwardRefPrimitive<
  BaseMessageHeadingProps,
  'div'
> = primitiveWithForwardRef(MessageHeadingPrimitive);

MessageHeading.displayName = 'MessageHeading';
