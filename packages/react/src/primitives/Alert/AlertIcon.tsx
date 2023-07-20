import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { AlertVariations } from '../types';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
} from '../Icon/internal';
import { useIcons } from '../../hooks/useIcons';

interface AlertIconProps {
  variation?: AlertVariations;
  ariaHidden?: boolean;
}

/**
 * @internal For internal Amplify UI use only. May be removed in a future release.
 */
export const AlertIcon: React.FC<AlertIconProps> = ({
  variation,
  ariaHidden,
}) => {
  const icons = useIcons();
  let icon;
  switch (variation) {
    case 'info':
      icon = icons?.alert?.info ?? (
        <IconInfo
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
      break;
    case 'error':
      icon = icons?.alert?.error ?? (
        <IconError
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
      break;
    case 'warning':
      icon = icons?.alert?.warning ?? (
        <IconWarning
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
      break;
    case 'success':
      icon = icons?.alert?.success ?? (
        <IconCheckCircle
          aria-hidden={ariaHidden}
          className={ComponentClassNames.AlertIcon}
        />
      );
      break;
  }

  return <span className={ComponentClassNames.AlertIcon}>{icon}</span>;
};

AlertIcon.displayName = 'AlertIcon';
