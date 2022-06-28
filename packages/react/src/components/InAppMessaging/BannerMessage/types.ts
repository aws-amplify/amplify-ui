import { BannerMessageCommonProps } from '@aws-amplify/ui-react-core';

import { MessageDefaultStyle, MessageOverrideStyle } from '../hooks';

export interface BannerMessageProps
  extends BannerMessageCommonProps<MessageOverrideStyle | undefined> {}

export interface BannerMessageStyle extends MessageDefaultStyle {}

export interface BannerMessagePositionStyle {
  bottom: unknown;
  middle: unknown;
  top: unknown;
}
