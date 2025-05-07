import type { ViewStyle } from 'react-native';
import type { BannerMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';

import type { MessageDefaultStyle, MessageOverrideStyle } from '../../hooks';

export interface BannerMessageProps
  extends BannerMessageCommonProps<MessageOverrideStyle | undefined> {}

export interface BannerMessageStyle extends MessageDefaultStyle {}

export interface BannerMessagePositionStyle {
  bottom: ViewStyle;
  middle: ViewStyle;
  top: ViewStyle;
}
