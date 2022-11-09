import { useCallback } from 'react';
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type PressableStyle = ViewStyle | TextStyle;

export type PressableStyleProps = {
  disabled: PressableProps['disabled'];
  disabledStyle?: PressableStyle;
  style: PressableProps['style'];
  themedStyle: PressableStyle;
};

export const usePressableStyles = ({
  disabled,
  disabledStyle,
  style,
  themedStyle,
}: PressableStyleProps): (({
  pressed,
}: PressableStateCallbackType) => StyleProp<PressableStyle>) => {
  return useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<PressableStyle> => {
      const containerStyle: PressableStyle = {
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
