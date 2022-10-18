import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import { View } from 'react-native';

import { Button } from '../Button';

import { styles } from './styles';
import { TabProps, TabsProps } from './types';

export function Tab({ label, ...rest }: TabProps): JSX.Element {
  return (
    <Button {...rest} accessibilityRole="tab">
      {label}
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

  const contentPanels: React.ReactNode[] = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement<TabProps>(child)) {
        return child.props.children;
      }
    });
  }, [children]);

  return (
    <View {...rest} style={[styles.container, style]}>
      <View accessibilityRole="tablist" style={styles.tabList}>
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
      {contentPanels[selectedIndex]}
    </View>
  );
}
