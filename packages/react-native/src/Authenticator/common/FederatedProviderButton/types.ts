import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { ButtonProps } from '../../../primitives';

export interface FederatedProviderButtonProps extends ButtonProps {
  source: ImageSourcePropType;
}

export interface FederatedProviderButtonStyles {
  container: ViewStyle;
  icon: ImageStyle;
  label: TextStyle;
}
