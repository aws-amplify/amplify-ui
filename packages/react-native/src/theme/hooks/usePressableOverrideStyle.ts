import { useCallback } from 'react';
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface UsePressableOverrideStyleProps
  extends Pick<PressableProps, 'style'> {
  themedStyle?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
}

export const usePressableOverrideStyle = ({
  style,
  themedStyle,
  pressedStyle,
}: UsePressableOverrideStyleProps): (({
  pressed,
}: PressableStateCallbackType) => StyleProp<ViewStyle>) => {
  return useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;
      return [
        themedStyle,
        pressed ? pressedStyle : undefined,
        pressedStateStyle,
      ];
    },
    [pressedStyle, style, themedStyle]
  );
};
