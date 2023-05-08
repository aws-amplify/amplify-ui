import { BannerMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';
import { MessageOverrideStyle } from '../hooks';

type BannerMessageAlignment = 'left' | 'center' | 'right';

export interface BannerMessageProps
  extends BannerMessageCommonProps<MessageOverrideStyle | undefined> {
  alignment?: BannerMessageAlignment;
}
