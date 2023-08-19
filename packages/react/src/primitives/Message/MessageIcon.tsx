import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  MessageIconProps,
  BaseMessageIconProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { useMessageContext } from './useMessageContext';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
} from '../Icon/internal';

const MessageIconPrimitive: Primitive<MessageIconProps, typeof View> = (
  { className, ...rest },
  ref
) => {
  const { colorTheme } = useMessageContext();
  switch (colorTheme) {
    case 'info':
      return (
        <IconInfo
          className={classNames(ComponentClassNames.MessageIcon, className)}
          ref={ref}
          {...rest}
        />
      );
    case 'error':
      return (
        <IconError
          className={classNames(ComponentClassNames.MessageIcon, className)}
          ref={ref}
          {...rest}
        />
      );
    case 'warning':
      return (
        <IconWarning
          className={classNames(ComponentClassNames.MessageIcon, className)}
          ref={ref}
          {...rest}
        />
      );
    case 'success':
      return (
        <IconCheckCircle
          className={classNames(ComponentClassNames.MessageIcon, className)}
          ref={ref}
          {...rest}
        />
      );
    default:
      return null;
  }
};

export const MessageIcon: ForwardRefPrimitive<BaseMessageIconProps, 'div'> =
  React.forwardRef(MessageIconPrimitive);

MessageIcon.displayName = 'MessageIcon';
