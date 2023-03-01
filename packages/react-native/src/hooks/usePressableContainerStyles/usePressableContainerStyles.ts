import { useCallback } from 'react';
import { isFunction } from '@aws-amplify/ui';
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface UsePressableContainerStyleProps {
  /**
   * @description
   * Either view styles or a function representing override styles for the pressed state
   */
  overrideStyle: PressableProps['style'];

  /**
   * @description
   * Pass-through view styles, typically includes theme, disabled, variant styles
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * @description
   * Pass-through view styles for the pressed state applied before the override styles
   */
  pressedStyle?: StyleProp<ViewStyle>;
}

export const usePressableContainerStyles = ({
  overrideStyle,
  containerStyle,
  pressedStyle,
}: UsePressableContainerStyleProps): (({
  pressed,
}: PressableStateCallbackType) => StyleProp<ViewStyle>) => {
  return useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedOverrideStyle = isFunction(overrideStyle)
        ? overrideStyle({ pressed })
        : overrideStyle;
      return [
        containerStyle,
        pressed ? pressedStyle : undefined,
        // include last to override other styles
        pressedOverrideStyle,
      ];
    },
    [containerStyle, overrideStyle, pressedStyle]
  );
};
