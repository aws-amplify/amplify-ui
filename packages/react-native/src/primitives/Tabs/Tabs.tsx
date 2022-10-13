import React, { Children, cloneElement, useMemo, useState } from 'react';
import { View } from 'react-native';

import { childIsValidComponent } from '../../utils';
import { Button } from '../Button';

import { styles } from './styles';
import { TabProps, TabsProps } from './types';

export function Tab({ title, ...rest }: TabProps): JSX.Element {
  return (
    <Button {...rest} accessibilityRole="tab">
      {title}
    </Button>
  );
}

export function Tabs({
  children,
  defaultIndex,
  onChange,
  selectedIndex = 0,
  style,
  tabStyle,
  textStyle,
  ...rest
}: TabsProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(
    defaultIndex ?? selectedIndex
  );

  const handleOnChange = (nextIndex: number) => {
    setCurrentIndex(nextIndex);
    onChange?.(nextIndex);
  };

  const contentPanels: React.ReactNode[] = useMemo(() => {
    return Children.map(children, (child) => {
      if (childIsValidComponent(child, Tab)) {
        return child.props.children;
      }
    });
  }, [children]);

  return (
    <View {...rest} style={[styles.container, style]}>
      <View accessibilityRole="tablist" style={styles.tabList}>
        {Children.map(children, (child, index) => {
          if (childIsValidComponent(child, Tab)) {
            const selectedStyles =
              index === currentIndex ? styles.selected : undefined;

            return cloneElement<TabProps>(child, {
              key: index,
              onPress: () => handleOnChange(index),
              style: [styles.tab, tabStyle, selectedStyles],
              textStyle: [styles.tabText, textStyle, selectedStyles],
            });
          }
        })}
      </View>
      {contentPanels[currentIndex]}
    </View>
  );
}
