import { ViewStyle } from 'react-native';
import { LabelPosition } from './types';

const FLEX_DIRECTIONS: Record<LabelPosition, ViewStyle['flexDirection']> = {
  start: 'row-reverse',
  end: 'row',
  top: 'column-reverse',
  bottom: 'column',
};

export const getFlexDirectionFromLabelPosition = (
  position: LabelPosition
): ViewStyle['flexDirection'] => FLEX_DIRECTIONS[position];
