import { renderHook } from '@testing-library/react-native';
import { ViewStyle } from 'react-native';

import { PressableStyleProps, usePressableStyles } from '../usePressableStyles';

const serializeStyle = (style: ViewStyle[]) => style;

describe('usePressableStyles', () => {
  it('should apply styles correctly and return a style object', () => {
    const style: ViewStyle = {
      backgroundColor: 'red',
    };
    const themedStyle: ViewStyle = {
      backgroundColor: 'blue',
    };
    const props: PressableStyleProps = {
      disabled: false,
      style: style,
      themedStyle: themedStyle,
    };

    const { result } = renderHook(() => usePressableStyles(props));

    expect(result.current({ pressed: false })).toStrictEqual(
      serializeStyle([{ ...themedStyle }, { ...style }])
    );
  });

  it('should apply disabled styles correctly and return a style object', () => {
    const disabledStyle: ViewStyle = {
      opacity: 0.5,
    };
    const style: ViewStyle = {
      backgroundColor: 'red',
    };
    const themedStyle: ViewStyle = {
      backgroundColor: 'blue',
    };
    const props: PressableStyleProps = {
      disabled: true,
      disabledStyle: disabledStyle,
      style: style,
      themedStyle: themedStyle,
    };

    const { result } = renderHook(() => usePressableStyles(props));

    expect(result.current({ pressed: false })).toStrictEqual(
      serializeStyle([{ ...themedStyle, ...disabledStyle }, { ...style }])
    );
  });
});
