import {
  BannerMessageComponent,
  CarouselMessageComponent,
  FullScreenMessageComponent,
  ModalMessageComponent,
} from '@aws-amplify/ui-react-core-notifications';

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

export interface InAppMessageDisplayProps {
  /**
   * Message override UI components
   */
  components?: MessageComponents;
}
