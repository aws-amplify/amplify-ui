import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import { View } from 'react-native';

import { Button } from '../Button';

import { styles } from './styles';
import { TabProps, TabsProps } from './types';

export const Tab = ({ title, ...rest }: TabProps): JSX.Element => (
  <Button {...rest} accessibilityRole="tab">
    {title}
  </Button>
);

export default function Tabs({
  children,
  onChange,
  selectedIndex = 0,
  style,
  ...rest
}: TabsProps): JSX.Element {
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
          const selectedStyles =
            index === selectedIndex ? styles.selected : undefined;

          // Also include disabled prop
          return cloneElement<TabProps>(child, {
            key: index,
            onPress: () => onChange?.(index),
            style: [styles.tab, selectedStyles],
            textStyle: [styles.tabText, selectedStyles],
          });
        })}
      </View>
      {contentPanels[selectedIndex]}
    </View>
  );
}
