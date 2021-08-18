import React from 'react';
import { IconInfo, IconError, IconWarning, IconCheckCircle } from '../Icon';

import { AlertVariation } from '../types/alert';

interface AlertIconProps {
  variation: AlertVariation;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ variation }) => {
  switch (variation) {
    case 'info':
      return <IconInfo />;
    case 'error':
      return <IconError />;
    case 'warning':
      return <IconWarning />;
    case 'success':
      return <IconCheckCircle />;
    default:
      return null;
  }
};
