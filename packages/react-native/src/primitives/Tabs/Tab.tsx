import React, { useCallback } from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { Button } from '../Button';
import { getThemedStyles } from './styles';
import { TabProps } from './types';

export default function Tab({
  children,
  selected,
  style,
  textStyle,
  indicatorPosition,
  ...rest
}: TabProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme, indicatorPosition);

  const selectedStyles = selected ? themedStyle.selected : null;

  const containerStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const readonlyStyle = selected ? themedStyle.readonly : null;
      const pressedStateStyle =
        (typeof style === 'function' ? style({ pressed }) : style) ?? null;

      // include `pressedStateStyle` last to override other styles
      return [
        themedStyle.tab,
        readonlyStyle,
        selectedStyles,
        pressedStateStyle,
      ];
    },
    [selected, selectedStyles, style, themedStyle]
  );

  return (
    <Button
      {...rest}
      accessibilityRole="tab"
      style={containerStyle}
      textStyle={[themedStyle.tabText, textStyle, selectedStyles]}
    >
      {children}
    </Button>
  );
}
