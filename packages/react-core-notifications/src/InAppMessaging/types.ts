import type React from 'react';
import type {
  InAppMessage as InAppMessageBase,
  InAppMessageAction as InAppMessageActionBase,
  InAppMessageButton as InAppMessageButtonBase,
  InAppMessageContent as InAppMessageContentBase,
  InAppMessageImage as InAppMessageImageBase,
  InAppMessageLayout as InAppMessageLayoutBase,
  InAppMessageStyle as InAppMessageStyleBase,
  InAppMessageTextAlign as InAppMessageTextAlignBase,
} from 'aws-amplify/in-app-messaging';

export type InAppMessage = InAppMessageBase;
export type InAppMessageAction = InAppMessageActionBase;
export type InAppMessageButton = InAppMessageButtonBase;
export type InAppMessageContent = InAppMessageContentBase;
export type InAppMessageImage = InAppMessageImageBase;
export type InAppMessageLayout = InAppMessageLayoutBase;
export type InAppMessageStyle = InAppMessageStyleBase;
export type InAppMessageTextAlign = InAppMessageTextAlignBase;

export type OnMessageAction = (params: {
  action: InAppMessageAction;
  url?: string | undefined;
}) => void;

export interface MessageButtonProps
  extends Omit<InAppMessageButton, 'action' | 'url'> {
  onAction: () => void;
}

// omit payload button props, replace with MessageButtonProps
export interface MessageContentProps
  extends Omit<InAppMessageContent, 'primaryButton' | 'secondaryButton'> {
  primaryButton?: MessageButtonProps;
  secondaryButton?: MessageButtonProps;
}

export interface MessageComponentBaseProps<Style = unknown>
  extends MessageCommonProps<Style>,
    MessageContentProps {}

// props common to each Message component
export interface MessageCommonProps<PlatformStyleProps> {
  layout: InAppMessageLayout;
  onClose?: () => void;
  onDisplay?: () => void;
  style?: PlatformStyleProps;
}

export type BannerMessageLayouts =
  | 'BOTTOM_BANNER'
  | 'MIDDLE_BANNER'
  | 'TOP_BANNER';

export type MessageComponentPosition = 'bottom' | 'middle' | 'top';

// Banner Message requires a `position` prop
export interface BannerMessageCommonProps<PlatformStyleProps>
  extends MessageCommonProps<PlatformStyleProps>,
    MessageContentProps {
  position?: MessageComponentPosition;
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
  body?: InAppMessageStyle;
  container?: InAppMessageStyle;
  header?: InAppMessageStyle;
  primaryButton?: InAppMessageStyle;
  secondaryButton?: InAppMessageStyle;
}

export type BannerMessageComponent<PlatformStyleProps> = React.ComponentType<
  BannerMessageCommonProps<PlatformStyleProps>
>;
export type CarouselMessageComponent<PlatformStyleProps> = React.ComponentType<
  CarouselMessageCommonProps<PlatformStyleProps>
>;
export type FullScreenMessageComponent<PlatformStyleProps> =
  React.ComponentType<FullScreenMessageCommonProps<PlatformStyleProps>>;
export type ModalMessageComponent<PlatformStyleProps> = React.ComponentType<
  ModalMessageCommonProps<PlatformStyleProps>
>;
