import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { ButtonProps } from '../../../primitives';

export interface FederatedProviderButtonProps extends ButtonProps {
  source: ImageSourcePropType;
}

export interface FederatedProviderButtonStyles {
  container: ViewStyle;
  icon: StyleProp<ImageStyle>;
  label: TextStyle;
}
