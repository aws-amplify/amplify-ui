import { ModalMessageCommonProps } from '@aws-amplify/ui-react-core';

import { MessageDefaultStyle, MessageOverrideStyle } from '../../hooks';

export interface ModalMessageProps
  extends ModalMessageCommonProps<MessageOverrideStyle | undefined> {}

export interface ModalMessageStyle extends MessageDefaultStyle {}
