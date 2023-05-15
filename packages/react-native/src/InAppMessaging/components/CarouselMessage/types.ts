import { StyleProp, ViewStyle } from 'react-native';

import {
  CarouselMessageCommonProps,
  MessageComponentBaseProps,
} from '@aws-amplify/ui-react-core-notifications';

import { MessageDefaultStyle, MessageOverrideStyle } from '../../hooks';

interface CarouselMessageOverrideStyle extends MessageOverrideStyle {
  pageIndicatorActive?: StyleProp<ViewStyle>;
  pageIndicatorInactive?: StyleProp<ViewStyle>;
}

export interface CarouselMessageProps
  extends CarouselMessageCommonProps<
    CarouselMessageOverrideStyle | undefined
  > {}

export interface CarouselMessageItemProps
  extends MessageComponentBaseProps<CarouselMessageOverrideStyle> {}

export interface CarouselMessageStyle extends MessageDefaultStyle {}

export interface CarouselMessageComponentStyle {
  pageIndicatorActive: ViewStyle;
  pageIndicatorInactive: ViewStyle;
}
