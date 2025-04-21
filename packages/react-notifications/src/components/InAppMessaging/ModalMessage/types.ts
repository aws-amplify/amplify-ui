import type { ModalMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';
import type { MessageOverrideStyle } from '../hooks';

export interface ModalMessageProps
  extends ModalMessageCommonProps<MessageOverrideStyle | undefined> {}
