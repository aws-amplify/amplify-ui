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
import { useMessage } from './useMessage';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
  useIcons,
} from '../Icon/internal';

const MessageIconPrimitive: Primitive<MessageIconProps, 'div'> = (
  { className, ...rest },
  ref
) => {
  const icons = useIcons('message');
  const { colorTheme } = useMessage();
  let icon;
  switch (colorTheme) {
    case 'info':
      icon = icons?.info ?? <IconInfo />;
      break;
    case 'error':
      icon = icons?.error ?? <IconError />;
      break;
    case 'warning':
      icon = icons?.warning ?? <IconWarning />;
      break;
    case 'success':
      icon = icons?.success ?? <IconCheckCircle />;
      break;
  }
  return icon ? (
    <View
      className={classNames(ComponentClassNames.MessageIcon, className)}
      aria-hidden="true"
      ref={ref}
      {...rest}
    >
      {icon}
    </View>
  ) : null;
};

export const MessageIcon: ForwardRefPrimitive<BaseMessageIconProps, 'div'> =
  React.forwardRef(MessageIconPrimitive);

MessageIcon.displayName = 'MessageIcon';
