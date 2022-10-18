import React, { Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';

import { Button } from '../Button';

import { styles } from './styles';
import { TabProps, TabsProps } from './types';

export function Tab({ children, ...rest }: TabProps): JSX.Element {
  return (
    <Button {...rest} accessibilityRole="tab">
      {children}
    </Button>
  );
}

export function Tabs({
  children,
  onChange,
  selectedIndex = 0,
  style,
  tabStyle,
  textStyle,
  ...rest
}: TabsProps): JSX.Element {
  const handleOnChange = (nextIndex: number) => {
    onChange?.(nextIndex);
  };

  return (
    <View {...rest} accessibilityRole="tablist" style={[styles.tabList, style]}>
      {Children.map(children, (child, index) => {
        if (isValidElement<TabProps>(child)) {
          const selectedStyles =
            index === selectedIndex ? styles.selected : undefined;

          return cloneElement<TabProps>(child, {
            key: index,
            onPress: () => {
              handleOnChange(index);
            },
            style: [styles.tab, tabStyle, selectedStyles],
            textStyle: [styles.tabText, textStyle, selectedStyles],
          });
        }
      })}
    </View>
  );
}
