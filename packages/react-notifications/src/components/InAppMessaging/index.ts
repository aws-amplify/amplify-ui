// re-export in-app types from '@aws-amplify/ui-react-core-notifications'
export {
  InAppMessage,
  InAppMessageAction,
  InAppMessageButton,
  InAppMessageContent,
  InAppMessageImage,
  InAppMessageLayout,
  InAppMessagingProvider,
  InAppMessageStyle,
  InAppMessageTextAlign,
  useInAppMessaging,
} from '@aws-amplify/ui-react-core-notifications';

export { BannerMessageProps } from './BannerMessage';
export { FullScreenMessageProps } from './FullScreenMessage';
export { InAppMessageDisplay, MessageComponents } from './InAppMessageDisplay';
export { ModalMessageProps } from './ModalMessage';
export { withInAppMessaging } from './withInAppMessaging';
