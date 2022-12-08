import { renderHook } from '@testing-library/react-native';
import { ViewStyle } from 'react-native';

import {
  UsePressableContainerStyleProps,
  usePressableContainerStyles,
} from '../usePressableContainerStyles';

const style: ViewStyle = {
  backgroundColor: 'red',
};
const themedStyle: ViewStyle = {
  padding: 10,
};
const pressedStyle: ViewStyle = {
  opacity: 70,
};

describe('usePressableContainerStyles', () => {
  it('should apply styles correctly and return a style object', () => {
    const props: UsePressableContainerStyleProps = {
      overrideStyle: style,
      containerStyle: themedStyle,
      pressedStyle,
    };

    const { result } = renderHook(() => usePressableContainerStyles(props));

    expect(result.current({ pressed: false })).toStrictEqual([
      { ...themedStyle },
      undefined, // no pressed styles
      { ...style },
    ]);
  });

  it('should apply pressed styles correctly and return a style object', () => {
    const props: UsePressableContainerStyleProps = {
      overrideStyle: style,
      containerStyle: themedStyle,
      pressedStyle,
    };

    const { result } = renderHook(() => usePressableContainerStyles(props));

    expect(result.current({ pressed: true })).toStrictEqual([
      { ...themedStyle },
      { ...pressedStyle },
      { ...style },
    ]);
  });

  it('should apply style function correctly and return a style object', () => {
    const props: UsePressableContainerStyleProps = {
      overrideStyle: () => {
        return style;
      },
      containerStyle: themedStyle,
    };

    const { result } = renderHook(() => usePressableContainerStyles(props));

    expect(result.current({ pressed: false })).toStrictEqual([
      { ...themedStyle },
      undefined,
      { ...style },
    ]);
  });
});
