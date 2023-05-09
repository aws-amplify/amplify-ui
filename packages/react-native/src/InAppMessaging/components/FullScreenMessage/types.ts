import { FullScreenMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';
import { MessageDefaultStyle, MessageOverrideStyle } from '../../hooks';

export interface FullScreenMessageProps
  extends FullScreenMessageCommonProps<MessageOverrideStyle | undefined> {}

export interface FullScreenMessageStyle extends MessageDefaultStyle {}
