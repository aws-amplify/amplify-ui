import {
  BannerMessageComponent,
  CarouselMessageComponent,
  FullScreenMessageComponent,
  ModalMessageComponent,
} from '@aws-amplify/ui-react-core';

import { BannerMessageProps } from '../BannerMessage';
import { CarouselMessageProps } from '../CarouselMessage';
import { FullScreenMessageProps } from '../FullScreenMessage';
import { ModalMessageProps } from '../ModalMessage';

type BannerStyle = BannerMessageProps['style'];
type CarouselStyle = CarouselMessageProps['style'];
type FullScreenStyle = FullScreenMessageProps['style'];
type ModalStyle = ModalMessageProps['style'];

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
