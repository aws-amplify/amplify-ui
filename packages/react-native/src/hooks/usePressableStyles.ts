import { useCallback } from 'react';
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type PressableStyleProps = {
  disabled: PressableProps['disabled'];
  disabledStyle?: ViewStyle;
  style: PressableProps['style'];
  themedStyle: ViewStyle;
};

export const usePressableStyles = ({
  disabled,
  disabledStyle,
  style,
  themedStyle,
}: PressableStyleProps): (({
  pressed,
}: PressableStateCallbackType) => StyleProp<ViewStyle>) => {
  return useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const containerStyle: ViewStyle = {
        ...themedStyle,
        ...(disabled && disabledStyle),
      };

      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;
      return [containerStyle, pressedStateStyle];
    },
    [disabled, disabledStyle, style, themedStyle]
  );
};
