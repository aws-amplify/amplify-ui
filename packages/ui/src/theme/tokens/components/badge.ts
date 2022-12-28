import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type VariationKey = 'backgroundColor' | 'color';

type BadgeVariationTokens<OutputType> = DesignTokenProperties<
  VariationKey,
  OutputType
>;

type SizeKey = 'fontSize' | 'paddingHorizontal' | 'paddingVertical';

type BadgeSizeTokens<OutputType> = DesignTokenProperties<SizeKey, OutputType>;

type BadgeKey =
  | 'backgroundColor'
  | 'borderRadius'
  | 'color'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'textAlign';

export type BadgeTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<BadgeKey, OutputType> & {
    error?: BadgeVariationTokens<OutputType>;
    large?: BadgeSizeTokens<OutputType>;
    small?: BadgeSizeTokens<OutputType>;
    info?: BadgeVariationTokens<OutputType>;
    success?: BadgeVariationTokens<OutputType>;
    warning?: BadgeVariationTokens<OutputType>;
  };

export const badge: Required<BadgeTokens<'default'>> = {
  // Default styles
  color: { value: '{colors.font.primary.value}' },
  lineHeight: { value: 1 },
  fontWeight: { value: '{fontWeights.semibold.value}' },
  fontSize: { value: '{fontSizes.small.value}' },
  textAlign: { value: 'center' },
  paddingVertical: { value: '{space.xs.value}' },
  paddingHorizontal: { value: '{space.small.value}' },
  backgroundColor: { value: '{colors.background.tertiary.value}' },
  // An arbitrarily large value to ensure that the left and right sides of the badge are perfectly rounded for any size variation
  borderRadius: { value: '{radii.xl.value}' },

  // Variations
  info: {
    color: { value: '{colors.font.info.value}' },
    backgroundColor: { value: '{colors.background.info.value}' },
  },

  warning: {
    color: { value: '{colors.font.warning.value}' },
    backgroundColor: { value: '{colors.background.warning.value}' },
  },

  success: {
    color: { value: '{colors.font.success.value}' },
    backgroundColor: { value: '{colors.background.success.value}' },
  },

  error: {
    color: { value: '{colors.font.error.value}' },
    backgroundColor: { value: '{colors.background.error.value}' },
  },

  // Sizes
  small: {
    fontSize: { value: '{fontSizes.xs.value}' },
    paddingVertical: { value: '{space.xxs.value}' },
    paddingHorizontal: { value: '{space.xs.value}' },
  },
  // medium is the default size
  large: {
    fontSize: { value: '{fontSizes.medium.value}' },
    paddingVertical: { value: '{space.small.value}' },
    paddingHorizontal: { value: '{space.medium.value}' },
  },
};
