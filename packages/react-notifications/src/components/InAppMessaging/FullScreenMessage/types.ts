import { FullScreenMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';
import { MessageOverrideStyle } from '../hooks';

export interface FullScreenMessageProps
  extends FullScreenMessageCommonProps<MessageOverrideStyle | undefined> {}
