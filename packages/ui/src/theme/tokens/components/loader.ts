import {
  AnimationDurationValue,
  DesignToken,
  SpaceValue,
  StrokeEmptyValue,
  StrokeFilledValue,
  StrokeLinecapValue,
} from '../types/designToken';

interface LoaderSizeTokens {
  height: DesignToken<SpaceValue>;
  width: DesignToken<SpaceValue>;
}

interface LoaderLinearSizeTokens {
  height: DesignToken<SpaceValue>;
  strokeWidth: DesignToken<SpaceValue>;
}

interface LoaderLinearTokens {
  width: DesignToken<SpaceValue>;
  minWidth: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  strokeWidth: DesignToken<SpaceValue>;
  strokeFilled: DesignToken<StrokeFilledValue>;
  strokeEmpty: DesignToken<StrokeEmptyValue>;
  strokeLinecap: DesignToken<StrokeLinecapValue>;
  animationDuration: DesignToken<AnimationDurationValue>;
  small: LoaderLinearSizeTokens;
  large: LoaderLinearSizeTokens;
}

export interface LoaderTokens {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  strokeEmpty: DesignToken<StrokeEmptyValue>;
  strokeFilled: DesignToken<StrokeFilledValue>;
  strokeLinecap: DesignToken<StrokeLinecapValue>;
  animationDuration: DesignToken<AnimationDurationValue>;
  small: LoaderSizeTokens;
  large: LoaderSizeTokens;
  linear: LoaderLinearTokens;
}

export const loader: LoaderTokens = {
  width: { value: '{fontSizes.medium.value}' },
  height: { value: '{fontSizes.medium.value}' },
  strokeEmpty: { value: '{colors.neutral.20.value}' },
  strokeFilled: { value: '{colors.brand.primary.80.value}' },
  strokeLinecap: { value: 'round' },
  animationDuration: { value: '1s' },
  small: {
    width: { value: '{fontSizes.small.value}' },
    height: { value: '{fontSizes.small.value}' },
  },
  large: {
    width: { value: '{fontSizes.large.value}' },
    height: { value: '{fontSizes.large.value}' },
  },
  linear: {
    width: { value: '100%' },
    minWidth: { value: '5rem' },
    height: { value: '{fontSizes.medium.value}' },
    strokeWidth: { value: '{fontSizes.medium.value}' },
    strokeFilled: { value: '{colors.brand.primary.80.value}' },
    strokeEmpty: { value: '{colors.neutral.20.value}' },
    strokeLinecap: { value: 'round' },
    animationDuration: { value: '1s' },
    small: {
      height: { value: '{fontSizes.small.value}' },
      strokeWidth: { value: '{fontSizes.small.value}' },
    },
    large: {
      height: { value: '{fontSizes.large.value}' },
      strokeWidth: { value: '{fontSizes.large.value}' },
    },
  },
};
