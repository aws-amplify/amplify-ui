import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { MessageTitleProps, Primitive } from '../types';
import { Flex } from '../Flex';

const MessageTitlePrimitive: Primitive<MessageTitleProps, typeof Flex> = (
  { children, className, ...rest },
  ref
) => {
  return (
    <Flex
      className={classNames(ComponentClassNames.MessageTitle, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/message)
 */
export const MessageTitle = React.forwardRef(MessageTitlePrimitive);

MessageTitle.displayName = 'MessageTitle';
