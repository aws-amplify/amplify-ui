import {
  BannerMessageCommonProps,
  BannerMessageComponent,
  CarouselMessageCommonProps,
  CarouselMessageComponent,
  FullScreenMessageCommonProps,
  FullScreenMessageComponent,
  ModalMessageCommonProps,
  ModalMessageComponent,
  OnMessageAction,
} from '../../types';

interface Components<PlatformStyleProps> {
  BannerMessage: BannerMessageComponent<PlatformStyleProps>;
  CarouselMessage: CarouselMessageComponent<PlatformStyleProps>;
  FullScreenMessage: FullScreenMessageComponent<PlatformStyleProps>;
  ModalMessage: ModalMessageComponent<PlatformStyleProps>;
}

interface Styles<PlatformStyleProps> {
  bannerMessage?: PlatformStyleProps;
  carouselMessage?: PlatformStyleProps;
  fullScreenMessage?: PlatformStyleProps;
  modalMessage?: PlatformStyleProps;
}

export interface UseMessageParams<PlatformStyleProps> {
  components: Components<PlatformStyleProps>;
  onMessageAction: OnMessageAction;
  styles?: Styles<PlatformStyleProps>;
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
  Component: MessageComponent<PlatformStyleProps>;
  props: MessageProps<PlatformStyleProps>;
}
