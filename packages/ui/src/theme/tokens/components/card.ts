import {
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
  BorderStyleValue,
  BorderWidthValue,
  BoxShadowValue,
  DesignToken,
  SpaceValue,
} from '../types/designToken';

interface CardVariationTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
}

export type CardTokens = CardVariationTokens & {
  padding: DesignToken<SpaceValue>;
  outlined: CardVariationTokens;
  elevated: CardVariationTokens;
};

export const card: CardTokens = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  borderRadius: { value: '{radii.xs.value}' },
  borderWidth: { value: '0' },
  borderStyle: { value: 'solid' },
  borderColor: { value: 'transparent' },
  boxShadow: { value: 'none' },
  padding: { value: '{space.medium.value}' },

  outlined: {
    backgroundColor: { value: '{components.card.backgroundColor.value}' },
    borderRadius: { value: '{radii.xs.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    borderColor: { value: '{colors.border.primary.value}' },
    boxShadow: { value: '{components.card.boxShadow.value}' },
  },

  elevated: {
    backgroundColor: { value: '{components.card.backgroundColor.value}' },
    borderRadius: { value: '{radii.xs.value}' },
    borderWidth: { value: '0' },
    borderStyle: { value: 'solid' },
    borderColor: { value: 'transparent' },
    boxShadow: { value: '{shadows.medium.value}' },
  },
};
