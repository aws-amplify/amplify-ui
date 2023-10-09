import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { ButtonProps } from '../../../primitives';

export interface FederatedProviderButtonProps
  extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode;
  source: ImageSourcePropType;
}

export interface FederatedProviderButtonStyles {
  container: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}
