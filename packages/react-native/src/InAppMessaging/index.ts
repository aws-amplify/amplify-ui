// re-export in-app types from '@aws-amplify/ui-react-core-notifications'
export type {
  InAppMessage,
  InAppMessageAction,
  InAppMessageButton,
  InAppMessageContent,
  InAppMessageImage,
  InAppMessageLayout,
  InAppMessageStyle,
  InAppMessageTextAlign,
} from '@aws-amplify/ui-react-core-notifications';
export {
  InAppMessagingProvider,
  useInAppMessaging,
} from '@aws-amplify/ui-react-core-notifications';

export type {
  BannerMessageProps,
  CarouselMessageProps,
  FullScreenMessageProps,
  ModalMessageProps,
  MessageComponents,
} from './components';
export { InAppMessageDisplay, withInAppMessaging } from './components';
