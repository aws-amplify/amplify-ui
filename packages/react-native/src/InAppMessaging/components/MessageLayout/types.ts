import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core-notifications';

import { DeviceOrientation } from '../../../hooks';
import {
  MessageComponentStyles,
  MessageOverrideStyle,
  UseMessageProps,
} from '../../hooks';

export interface LayoutProps
  extends Omit<MessageComponentBaseProps<MessageOverrideStyle>, 'style'>,
    Omit<UseMessageProps, 'shouldRenderMessage' | 'styles'> {
  orientation: DeviceOrientation;
  styles: Omit<MessageComponentStyles, 'wrapper'>;
  testID?: string;
}
