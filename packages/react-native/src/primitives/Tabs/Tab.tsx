import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { usePressableContainerStyles } from '../../hooks';
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

  const containerStyle: ViewStyle = useMemo(
    (): ViewStyle => ({
      ...themedStyle.tab,
      ...(selected && themedStyle.readonly),
      ...selectedStyles,
    }),
    [selected, selectedStyles, themedStyle]
  );

  const pressableStyle = usePressableContainerStyles({
    overrideStyle: style,
    containerStyle,
    pressedStyle: themedStyle.pressed,
  });

  return (
    <Button
      {...rest}
      accessibilityRole="tab"
      style={pressableStyle}
      textStyle={[themedStyle.tabText, textStyle, selectedStyles]}
    >
      {children}
    </Button>
  );
}
