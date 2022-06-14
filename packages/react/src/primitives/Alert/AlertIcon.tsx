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
  variation: AlertVariations;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ variation }) => {
  switch (variation) {
    case 'info':
      return <IconInfo className={ComponentClassNames.AlertIcon} />;
    case 'error':
      return <IconError className={ComponentClassNames.AlertIcon} />;
    case 'warning':
      return <IconWarning className={ComponentClassNames.AlertIcon} />;
    case 'success':
      return <IconCheckCircle className={ComponentClassNames.AlertIcon} />;
    default:
      return null;
  }
};

AlertIcon.displayName = 'AlertIcon';
