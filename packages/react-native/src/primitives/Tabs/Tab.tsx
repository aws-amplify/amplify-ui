import React, { useCallback } from 'react';
import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

import { Button } from '../Button';

import { styles } from './styles';
import { TabProps } from './types';

export default function Tab({
  children,
  selected,
  style,
  textStyle,
  ...rest
}: TabProps): JSX.Element {
  const selectedStyles = selected ? styles.selected : null;

  const containerStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const readonlyStyle = selected ? styles.readonly : null;
      const pressedStateStyle =
        (typeof style === 'function' ? style({ pressed }) : style) ?? null;

      // include `pressedStateStyle` last to override other styles
      return [styles.tab, readonlyStyle, selectedStyles, pressedStateStyle];
    },
    [selected, selectedStyles, style]
  );

  return (
    <Button
      {...rest}
      accessibilityRole="tab"
      style={containerStyle}
      textStyle={[styles.tabText, textStyle, selectedStyles]}
    >
      {children}
    </Button>
  );
}
