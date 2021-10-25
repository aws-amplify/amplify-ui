import * as React from 'react';

import { AlertVariations, IconSize } from '../types';
import { IconInfo, IconError, IconWarning, IconCheckCircle } from '../Icon';

interface AlertIconProps {
  variation: AlertVariations;
  iconSize: IconSize;
}

export const AlertIcon: React.FC<AlertIconProps> = ({
  variation,
  iconSize,
}) => {
  switch (variation) {
    case 'info':
      return <IconInfo size={iconSize} />;
    case 'error':
      return <IconError size={iconSize} />;
    case 'warning':
      return <IconWarning size={iconSize} />;
    case 'success':
      return <IconCheckCircle size={iconSize} />;
    default:
      return null;
  }
};
