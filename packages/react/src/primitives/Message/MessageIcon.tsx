import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { MessageColorThemes } from '../types';
import { useMessageContext } from './useMessageContext';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
} from '../Icon/internal';

interface MessageIconProps {
  icon?: MessageColorThemes;
}

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const MessageIcon: React.FC<MessageIconProps> = ({ icon }) => {
  const { colorTheme } = useMessageContext();

  // If colorTheme prop is provided to MessageIcon use that (overrideColorTheme)
  // otherwise, use the colorTheme from context.
  switch (icon ? icon : colorTheme) {
    case 'info':
      return <IconInfo className={ComponentClassNames.MessageIcon} />;
    case 'error':
      return <IconError className={ComponentClassNames.MessageIcon} />;
    case 'warning':
      return <IconWarning className={ComponentClassNames.MessageIcon} />;
    case 'success':
      return <IconCheckCircle className={ComponentClassNames.MessageIcon} />;
    default:
      return null;
  }
};

MessageIcon.displayName = 'MessageIcon';
