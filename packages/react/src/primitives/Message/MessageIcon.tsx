import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { MessageColorThemes } from '../types';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
} from '../Icon/internal';

interface MessageIconProps {
  severity?: MessageColorThemes;
  ariaHidden?: boolean;
}

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const MessageIcon: React.FC<MessageIconProps> = ({
  severity,
  ariaHidden,
}) => {
  switch (severity) {
    case 'info':
      return (
        <IconInfo
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    case 'error':
      return (
        <IconError
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    case 'warning':
      return (
        <IconWarning
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    case 'success':
      return (
        <IconCheckCircle
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
    default:
      return null;
  }
};

MessageIcon.displayName = 'MessageIcon';
