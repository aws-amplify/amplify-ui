import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { NotificationBarProps, Primitive } from '../types';
import { Flex } from '../Flex';

const NotificationBarPrimitive: Primitive<NotificationBarProps, typeof Flex> = (
  { children, className, ...rest },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.NotificationBar,
    className
  );

  return (
    <Flex className={componentClasses} ref={ref} {...rest}>
      {children}
    </Flex>
  );
};

export const NotificationBar = React.forwardRef(NotificationBarPrimitive);

NotificationBar.displayName = 'NotificationBar';
