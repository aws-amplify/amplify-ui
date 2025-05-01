import type { FullScreenMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';
import type { MessageOverrideStyle } from '../hooks';

export interface FullScreenMessageProps
  extends FullScreenMessageCommonProps<MessageOverrideStyle | undefined> {}
