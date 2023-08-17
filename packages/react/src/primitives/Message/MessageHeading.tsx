import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  MessageHeadingProps,
  BaseMessageHeadingProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { Flex } from '../Flex';

const MessageHeadingPrimitive: Primitive<MessageHeadingProps, typeof Flex> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <Flex
      className={classNames(ComponentClassNames.MessageHeading, className)}
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
> = React.forwardRef(MessageHeadingPrimitive);

MessageHeading.displayName = 'MessageHeading';
