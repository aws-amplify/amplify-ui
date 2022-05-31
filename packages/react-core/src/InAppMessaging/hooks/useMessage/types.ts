import {
  BannerMessageCommonProps,
  BannerMessageComponent,
  CarouselMessageCommonProps,
  CarouselMessageComponent,
  FullScreenMessageCommonProps,
  FullScreenMessageComponent,
  ModalMessageCommonProps,
  ModalMessageComponent,
  MessageComponents,
  MessageStyles,
  OnMessageAction,
} from '../../types';

export interface UseMessageParams<PlatformStyleProps> {
  components: MessageComponents<PlatformStyleProps>;
  onMessageAction: OnMessageAction;
  styles?: MessageStyles<PlatformStyleProps>;
}

type MessageComponent<PlatformStyleProps> =
  | BannerMessageComponent<PlatformStyleProps>
  | CarouselMessageComponent<PlatformStyleProps>
  | FullScreenMessageComponent<PlatformStyleProps>
  | ModalMessageComponent<PlatformStyleProps>;

type MessageProps<PlatformStyleProps> =
  | BannerMessageCommonProps<PlatformStyleProps>
  | CarouselMessageCommonProps<PlatformStyleProps>
  | FullScreenMessageCommonProps<PlatformStyleProps>
  | ModalMessageCommonProps<PlatformStyleProps>;

export interface UseMessage<PlatformStyleProps> {
  Component: MessageComponent<PlatformStyleProps> | null;
  props: MessageProps<PlatformStyleProps> | null;
}
