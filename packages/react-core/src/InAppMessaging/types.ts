import type {
  InAppMessage,
  InAppMessageAction,
  InAppMessageButton,
  InAppMessageContent,
  InAppMessageImage,
  InAppMessageLayout,
  InAppMessageStyle,
  InAppMessageTextAlign,
} from '@aws-amplify/notifications';

export type Message = InAppMessage;
export type MessageAction = InAppMessageAction;
export type MessageButton = InAppMessageButton;
export type MessageContent = InAppMessageContent;
export type MessageImage = InAppMessageImage;
export type MessageLayout = InAppMessageLayout;
export type MessageStyle = InAppMessageStyle;
export type MessageTextAlign = InAppMessageTextAlign;

export type OnMessageAction = (params: {
  action: MessageAction;
  url?: string | undefined;
}) => void;

export interface MessageButtonProps
  extends Omit<MessageButton, 'action' | 'url'> {
  onAction: () => void;
}

// omit payload button props, replace with MessageButtonProps
export interface MessageContentProps
  extends Omit<MessageContent, 'primaryButton' | 'secondaryButton'> {
  primaryButton?: MessageButtonProps;
  secondaryButton?: MessageButtonProps;
}

export interface MessageComponentBaseProps<Style = unknown>
  extends MessageCommonProps<Style>,
    MessageContentProps {}

// props common to each Message component
export interface MessageCommonProps<PlatformStyleProps> {
  layout: MessageLayout;
  onClose?: () => void;
  onDisplay?: () => void;
  style?: PlatformStyleProps;
}

export type BannerMessageLayouts =
  | 'BOTTOM_BANNER'
  | 'MIDDLE_BANNER'
  | 'TOP_BANNER';

export type MessageComponentPosition = 'bottom' | 'middle' | 'top';

export type MessageComponentAlignment = 'left' | 'center' | 'right';

// Banner Message requires a `position` prop
export interface BannerMessageCommonProps<PlatformStyleProps>
  extends MessageCommonProps<PlatformStyleProps>,
    MessageContentProps {
  position?: MessageComponentPosition;
  alignment?: MessageComponentAlignment;
}

// Carousel Message nests content props in its `data` prop
export interface CarouselMessageCommonProps<PlatformStyleProps>
  extends MessageCommonProps<PlatformStyleProps> {
  data?: MessageContentProps[];
}

export interface FullScreenMessageCommonProps<PlatformStyleProps>
  extends MessageCommonProps<PlatformStyleProps>,
    MessageContentProps {}

export interface ModalMessageCommonProps<PlatformStyleProps>
  extends MessageCommonProps<PlatformStyleProps>,
    MessageContentProps {}

export interface MessagePayloadStyle {
  body?: MessageStyle;
  container?: MessageStyle;
  header?: MessageStyle;
  primaryButton?: MessageStyle;
  secondaryButton?: MessageStyle;
}

export type BannerMessageComponent<PlatformStyleProps> = (
  props: BannerMessageCommonProps<PlatformStyleProps>
) => JSX.Element | null;
export type CarouselMessageComponent<PlatformStyleProps> = (
  props: CarouselMessageCommonProps<PlatformStyleProps>
) => JSX.Element | null;
export type FullScreenMessageComponent<PlatformStyleProps> = (
  props: FullScreenMessageCommonProps<PlatformStyleProps>
) => JSX.Element | null;
export type ModalMessageComponent<PlatformStyleProps> = (
  props: ModalMessageCommonProps<PlatformStyleProps>
) => JSX.Element | null;
