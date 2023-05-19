import { BannerMessageCommonProps } from '@aws-amplify/ui-react-core';
import { MessageOverrideStyle } from '../hooks';

type BannerMessageAlignment = 'left' | 'center' | 'right';

export interface BannerMessageProps
  extends BannerMessageCommonProps<MessageOverrideStyle | undefined> {
  alignment?: BannerMessageAlignment;
}
