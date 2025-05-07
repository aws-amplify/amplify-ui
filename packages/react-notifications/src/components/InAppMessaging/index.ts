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

export type { BannerMessageProps } from './BannerMessage';
export type { FullScreenMessageProps } from './FullScreenMessage';
export type { MessageComponents } from './InAppMessageDisplay';
export { InAppMessageDisplay } from './InAppMessageDisplay';
export type { ModalMessageProps } from './ModalMessage';
export { withInAppMessaging } from './withInAppMessaging';
