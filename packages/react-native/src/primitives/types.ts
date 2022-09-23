import { ViewStyle } from 'react-native';

export type LabelPosition = 'start' | 'end' | 'top' | 'bottom';

export const FLEX_DIRECTIONS: Record<
  LabelPosition,
  ViewStyle['flexDirection']
> = {
  start: 'row-reverse',
  end: 'row',
  top: 'column-reverse',
  bottom: 'column',
};
