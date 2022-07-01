import {
  BannerMessageComponent,
  CarouselMessageComponent,
  FullScreenMessageComponent,
  ModalMessageComponent,
} from '@aws-amplify/ui-react-core';

// TODO: replace these incrementally as they become available
type BannerStyle = any;
type CarouselStyle = any;
type FullScreenStyle = any;
type ModalStyle = any;

export interface MessageDefaultComponents {
  BannerMessage: BannerMessageComponent<BannerStyle>;
  CarouselMessage: CarouselMessageComponent<CarouselStyle>;
  FullScreenMessage: FullScreenMessageComponent<FullScreenStyle>;
  ModalMessage: ModalMessageComponent<ModalStyle>;
}

export interface MessageComponents extends Partial<MessageDefaultComponents> {}

export interface MessageStyles {
  bannerMessage?: BannerStyle;
  carouselMessage?: CarouselStyle;
  fullScreenMessage?: FullScreenStyle;
  modalMessage?: ModalStyle;
}

export interface InAppMessageDisplayProps {
  /**
   * Message override UI components
   */
  components?: MessageComponents;

  /**
   *  Message override styles
   */
  styles?: MessageStyles;
}
