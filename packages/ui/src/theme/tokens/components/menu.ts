import {
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
  BorderStyleValue,
  BorderWidthValue,
  BoxShadowValue,
  DesignToken,
  FlexDirectionValue,
  GapValue,
  SpaceValue,
} from '../types/designToken';

interface MenuSizeTokens {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
}

interface MenuItemTokens {
  minHeight: DesignToken<SpaceValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
}

export interface MenuTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  flexDirection: DesignToken<FlexDirectionValue>;
  gap: DesignToken<GapValue>;
  maxWidth: DesignToken<SpaceValue>;
  minWidth: DesignToken<SpaceValue>;
  small: MenuSizeTokens;
  large: MenuSizeTokens;
  item: MenuItemTokens;
}

export const menu: MenuTokens = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  boxShadow: { value: '{shadows.large.value}' },
  flexDirection: { value: 'column' },
  gap: { value: '{space.zero.value}' },
  maxWidth: { value: '30rem' },
  minWidth: { value: '14rem' },

  small: {
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
  },
  large: {
    width: { value: '{fontSizes.xxxl.value}' },
    height: { value: '{fontSizes.xxxl.value}' },
  },
  item: {
    minHeight: { value: '2.5rem' },
    paddingInlineStart: { value: '{space.medium.value}' },
    paddingInlineEnd: { value: '{space.medium.value}' },
  },
};
