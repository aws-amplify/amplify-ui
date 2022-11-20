import { StyleSheet, ViewStyle } from 'react-native';

import { StrictTheme } from '../../theme';
import { TabsProps, TabsStyles } from './types';

export const getThemedStyles = (
  theme: StrictTheme,
  indicatorPosition?: TabsProps['indicatorPosition']
): TabsStyles => {
  const {
    tokens: { colors, fontSizes, fontWeights, opacities, space, borderWidths },
  } = theme;

  const selectedTabBorderStyles: ViewStyle = {};
  const tabBorderStyles: ViewStyle = {};

  if (indicatorPosition && indicatorPosition === 'top') {
    selectedTabBorderStyles.borderTopColor = colors.brand.primary[80];
    tabBorderStyles.borderTopWidth = borderWidths.medium;
    tabBorderStyles.borderTopColor = colors.border.secondary;
  } else {
    selectedTabBorderStyles.borderBottomColor = colors.brand.primary[80];
    tabBorderStyles.borderBottomWidth = borderWidths.medium;
    tabBorderStyles.borderBottomColor = colors.border.secondary;
  }

  return StyleSheet.create({
    readonly: {
      opacity: opacities[100],
    },
    tabList: {
      flexDirection: 'row',
      width: '100%',
    },
    tab: {
      backgroundColor: colors.transparent,
      borderRadius: 0,
      flexBasis: 0,
      flexGrow: 1,
      paddingVertical: space.small,
      paddingHorizontal: space.medium,
      borderWidth: 0,
      ...tabBorderStyles,
    },
    tabText: {
      color: colors.font.secondary,
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.bold,
    },
    selected: {
      backgroundColor: colors.background.primary,
      color: colors.brand.primary[80],
      ...selectedTabBorderStyles,
    },
  });
};
