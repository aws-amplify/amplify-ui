import React, { Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { TabProps, TabsProps } from './types';

export default function Tabs({
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
