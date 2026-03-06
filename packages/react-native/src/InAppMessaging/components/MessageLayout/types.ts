import type { MessageComponentBaseProps } from '@aws-amplify/ui-react-core-notifications';

import type { DeviceOrientation } from '../../../hooks';
import type {
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
