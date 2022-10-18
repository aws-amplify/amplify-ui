import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react';
import {
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { Button } from '../Button';

import { styles } from './styles';
import { TabProps, TabsProps } from './types';

// put this component in its own file
export function Tab({
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

export function Tabs({
  children,
  onChange,
  selectedIndex = 0,
  style,
  ...rest
}: TabsProps): JSX.Element {
  const handleOnChange = (nextIndex: number) => {
    onChange?.(nextIndex);
  };

  return (
    <View {...rest} accessibilityRole="tablist" style={[styles.tabList, style]}>
      {Children.map(children, (child, index) => {
        if (isValidElement<TabProps>(child)) {
          return cloneElement<TabProps>(child, {
            onPress: () => {
              handleOnChange(index);
            },
            selected: index === selectedIndex,
          });
        }
      })}
    </View>
  );
}
