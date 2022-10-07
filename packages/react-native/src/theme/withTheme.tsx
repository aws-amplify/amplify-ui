import * as React from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '../hooks';
import { Theme } from './types';

export interface WithThemeProps<T> {
  themedStyle?: StyleSheet.NamedStyles<T>;
}

export function withTheme<
  StyleType,
  T extends WithThemeProps<StyleType> = WithThemeProps<StyleType>
>(
  WrappedComponent: React.ComponentType<T>,
  styleFunction: (theme: Theme) => StyleSheet.NamedStyles<StyleType>
): React.FC<T> {
  const displayName = WrappedComponent.displayName ?? WrappedComponent.name;

  const ComponentWithTheme = (
    props: Omit<T, keyof WithThemeProps<StyleType>>
  ) => {
    const theme = useTheme();
    const themedStyleSheet = React.useMemo(
      () => StyleSheet.create(styleFunction(theme)),
      [theme]
    );
    return <WrappedComponent {...themedStyleSheet} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
