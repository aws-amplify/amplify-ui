import { AlertVariations, IconSize, Primitive } from '../types';
import { IconInfo, IconError, IconWarning, IconCheckCircle } from '../Icon';

interface AlertIconProps {
  variation: AlertVariations;
  iconSize: IconSize;
}

export const AlertIcon: Primitive<AlertIconProps, 'svg'> = ({
  variation,
  iconSize,
  ...rest
}) => {
  switch (variation) {
    case 'info':
      return <IconInfo size={iconSize} {...rest} />;
    case 'error':
      return <IconError size={iconSize} {...rest} />;
    case 'warning':
      return <IconWarning size={iconSize} {...rest} />;
    case 'success':
      return <IconCheckCircle size={iconSize} {...rest} />;
    default:
      return null;
  }
};
