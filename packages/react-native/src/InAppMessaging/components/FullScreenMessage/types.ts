import { FullScreenMessageCommonProps } from '@aws-amplify/ui-react-core';
import { MessageDefaultStyle, MessageOverrideStyle } from '../../hooks';

export interface FullScreenMessageProps
  extends FullScreenMessageCommonProps<MessageOverrideStyle | undefined> {}

export interface FullScreenMessageStyle extends MessageDefaultStyle {}
