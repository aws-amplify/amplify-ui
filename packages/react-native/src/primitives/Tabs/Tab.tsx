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
  const selectedStyles = selected ? styles.selected : undefined;

  const containerStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;
      return [styles.tab, pressedStateStyle, selectedStyles];
    },
    [selectedStyles, style]
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
