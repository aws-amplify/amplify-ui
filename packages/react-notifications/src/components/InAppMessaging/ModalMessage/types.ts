import { ModalMessageCommonProps } from '@aws-amplify/ui-react-core-notifications';
import { MessageOverrideStyle } from '../hooks';

export interface ModalMessageProps
  extends ModalMessageCommonProps<MessageOverrideStyle | undefined> {}
