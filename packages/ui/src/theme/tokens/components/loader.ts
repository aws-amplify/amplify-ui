import {
  AnimationDurationValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  SpaceValue,
  StrokeEmptyValue,
  StrokeFilledValue,
  StrokeLinecapValue,
} from '../types/designToken';

interface LoaderSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
  height: DesignToken<SpaceValue>;
  width: DesignToken<SpaceValue>;
}

interface LoaderLinearSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
  strokeWidth: DesignToken<SpaceValue>;
}

interface LoaderLinearTokens {
  width: DesignToken<SpaceValue>;
  minWidth: DesignToken<SpaceValue>;
  fontSize: DesignToken<FontSizeValue>;
  strokeWidth: DesignToken<SpaceValue>;
  strokeFilled: DesignToken<StrokeFilledValue>;
  strokeEmpty: DesignToken<StrokeEmptyValue>;
  strokeLinecap: DesignToken<StrokeLinecapValue>;
  animationDuration: DesignToken<AnimationDurationValue>;
  small: LoaderLinearSizeTokens;
  large: LoaderLinearSizeTokens;
}

interface LoaderTextTokens {
  fill: DesignToken<ColorValue>;
}

export interface LoaderTokens {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  fontSize: DesignToken<FontSizeValue>;
  strokeEmpty: DesignToken<StrokeEmptyValue>;
  strokeFilled: DesignToken<StrokeFilledValue>;
  strokeLinecap: DesignToken<StrokeLinecapValue>;
  animationDuration: DesignToken<AnimationDurationValue>;
  small: LoaderSizeTokens;
  large: LoaderSizeTokens;
  linear: LoaderLinearTokens;
  text: LoaderTextTokens;
}

export const loader: LoaderTokens = {
  width: { value: '{fontSizes.medium.value}' },
  height: { value: '{fontSizes.medium.value}' },
  fontSize: { value: '{fontSizes.xs.value}' },
  strokeEmpty: { value: '{colors.neutral.20.value}' },
  strokeFilled: { value: '{colors.brand.primary.80.value}' },
  strokeLinecap: { value: 'round' },
  animationDuration: { value: '1s' },
  small: {
    width: { value: '{fontSizes.small.value}' },
    height: { value: '{fontSizes.small.value}' },
    fontSize: { value: '{fontSizes.xxs.value}' },
  },
  large: {
    width: { value: '{fontSizes.large.value}' },
    height: { value: '{fontSizes.large.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  linear: {
    width: { value: '100%' },
    minWidth: { value: '5rem' },
    fontSize: { value: '{fontSizes.medium.value}' },
    strokeWidth: { value: '{fontSizes.medium.value}' },
    strokeFilled: { value: '{colors.brand.primary.80.value}' },
    strokeEmpty: { value: '{colors.neutral.20.value}' },
    strokeLinecap: { value: 'round' },
    animationDuration: { value: '1s' },
    small: {
      strokeWidth: { value: '{fontSizes.small.value}' },
      fontSize: { value: '{fontSizes.small.value}' },
    },
    large: {
      strokeWidth: { value: '{fontSizes.large.value}' },
      fontSize: { value: '{fontSizes.large.value}' },
    },
  },
  text: {
    fill: { value: '{colors.font.primary.value}' },
  },
};
