import { ModalMessageCommonProps } from '@aws-amplify/ui-react-core';
import { MessageOverrideStyle } from '../hooks';

export interface ModalMessageProps
  extends ModalMessageCommonProps<MessageOverrideStyle | undefined> {}
