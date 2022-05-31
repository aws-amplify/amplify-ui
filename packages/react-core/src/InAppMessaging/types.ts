import {
  InAppMessageAction,
  InAppMessageButton,
  InAppMessageContent,
  InAppMessageLayout,
  InAppMessageStyle,
} from '@aws-amplify/notifications';

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

export type MessageComponentPosition = 'bottom' | 'middle' | 'top' | null;

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

export interface MessageComponents<PlatformStyleProps> {
  BannerMessage: BannerMessageComponent<PlatformStyleProps>;
  CarouselMessage: CarouselMessageComponent<PlatformStyleProps>;
  FullScreenMessage: FullScreenMessageComponent<PlatformStyleProps>;
  ModalMessage: ModalMessageComponent<PlatformStyleProps>;
}

export interface MessageStyles<PlatformStyleProps> {
  bannerMessage: PlatformStyleProps;
  carouselMessage: PlatformStyleProps;
  fullScreenMessage: PlatformStyleProps;
  modalMessage: PlatformStyleProps;
}
