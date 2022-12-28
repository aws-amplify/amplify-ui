import { ListRenderItem, StyleProp, ViewStyle } from 'react-native';

export interface CarouselProps<T> {
  data: ReadonlyArray<T>;
  indicatorActiveStyle?: StyleProp<ViewStyle>;
  indicatorInactiveStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  renderItem: ListRenderItem<T>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface CarouselPageIndicatorProps {
  activeStyle?: StyleProp<ViewStyle>;
  currentIndex: number | null;
  inactiveStyle?: StyleProp<ViewStyle>;
  numberOfItems: number;
  style?: StyleProp<ViewStyle>;
}

export interface CarouselStyles {
  indicator: ViewStyle;
}
