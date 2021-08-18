import React from 'react';
import { AlertVariation } from '../types/alert';
import { IconInfo, IconError, IconWarning, IconCheckCircle } from '../Icon';

interface AlertIconProps {
  variation: AlertVariation;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ variation }) => {
  switch (variation) {
    case 'info':
      return <IconInfo size="large" />;
    case 'error':
      return <IconError size="large" />;
    case 'warning':
      return <IconWarning size="large" />;
    case 'success':
      return <IconCheckCircle size="large" />;
    default:
      return null;
  }
};
