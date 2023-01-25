import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { AlertVariations } from '../types';
import {
  IconInfo,
  IconError,
  IconWarning,
  IconCheckCircle,
} from '../Icon/internal';

interface AlertIconProps {
  variation?: AlertVariations;
  ariaHidden?: boolean;
}

export const AlertIcon: React.FC<AlertIconProps> = ({
  variation,
  ariaHidden,
}) => {
  switch (variation) {
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

AlertIcon.displayName = 'AlertIcon';
