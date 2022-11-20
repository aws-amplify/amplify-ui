import React, { Children, cloneElement, isValidElement } from 'react';
import { View } from 'react-native';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { TabProps, TabsProps } from './types';

export default function Tabs({
  children,
  indicatorPosition = 'bottom',
  onChange,
  selectedIndex = 0,
  style,
  ...rest
}: TabsProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme, indicatorPosition);

  const handleOnChange = (nextIndex: number) => {
    onChange?.(nextIndex);
  };

  return (
    <View
      {...rest}
      accessibilityRole="tablist"
      style={[themedStyle.tabList, style]}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement<TabProps>(child)) {
          return cloneElement<TabProps>(child, {
            onPress: (event) => {
              child.props.onPress?.(event);
              handleOnChange(index);
            },
            indicatorPosition,
            selected: index === selectedIndex,
          });
        }
      })}
    </View>
  );
}
