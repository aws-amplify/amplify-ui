import { TextStyle, ViewStyle } from 'react-native';
import { ButtonProps, IconProps } from '..';

export interface FederatedProviderButtonProps extends ButtonProps {
  Icon?: React.ReactElement<IconProps>;
}

export interface FederatedProviderButtonStyles {
  container: ViewStyle;
  label: TextStyle;
  icon: ViewStyle;
}
