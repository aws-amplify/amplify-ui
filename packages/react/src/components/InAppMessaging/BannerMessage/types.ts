import { BannerMessageCommonProps } from '@aws-amplify/ui-react-core';
import { View, Flex } from '../../../primitives';

import { MessageDefaultStyle, MessageOverrideStyle } from '../hooks';

export interface BannerMessageProps
  extends BannerMessageCommonProps<MessageOverrideStyle | undefined> {}

export interface BannerMessageStyle extends MessageDefaultStyle {}

export interface BannerMessagePositionStyle {
  bottom: any;
  middle: any;
  top: any;
}
