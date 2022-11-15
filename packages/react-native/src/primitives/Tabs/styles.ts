import { StyleSheet, TextStyle } from 'react-native';

import { StrictTheme } from '../../theme';
import { TabsStyles } from './types';

export const getThemedStyles = (theme: StrictTheme): TabsStyles => {
  const { colors, components, fontSizes, fontWeights, opacities, space } =
    theme.tokens;

  return StyleSheet.create({
    readonly: {
      opacity: opacities[100],
      ...components?.tabs.readonly,
    },
    tabList: {
      flexDirection: 'row',
      width: '100%',
      ...components?.tabs.tabList,
    },
    tab: {
      backgroundColor: colors.background.tertiary,
      borderTopColor: colors.border.secondary,
      borderTopWidth: space.xxs,
      flexBasis: 0,
      flexGrow: 1,
      padding: space.large,
      ...components?.tabs.tab,
    },
    tabText: {
      color: colors.font.secondary,
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.bold as TextStyle['fontWeight'],
      ...components?.tabs.tabText,
    },
    selected: {
      backgroundColor: colors.background.primary,
      borderTopColor: colors.brand.primary[80],
      color: colors.brand.primary[80],
      ...components?.tabs.selected,
    },
  });
};
