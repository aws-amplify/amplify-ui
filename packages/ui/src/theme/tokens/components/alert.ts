import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type AlertVariationTokens<OutputType> = DesignTokenProperties<
  'backgroundColor' | 'color',
  OutputType
>;

type AlertIconTokens<OutputType> = DesignTokenProperties<'size', OutputType>;

type AlertHeadingTokens<OutputType> = DesignTokenProperties<
  'fontSize' | 'fontWeight',
  OutputType
>;

type AlertTokenKey =
  | 'alignItems'
  | 'justifyContent'
  | 'color'
  | 'backgroundColor'
  | 'paddingBlock'
  | 'paddingInline';

export type AlertTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<AlertTokenKey, OutputType> & {
    icon?: AlertIconTokens<OutputType>;
    heading?: AlertHeadingTokens<OutputType>;
    info?: AlertVariationTokens<OutputType>;
    error?: AlertVariationTokens<OutputType>;
    warning?: AlertVariationTokens<OutputType>;
    success?: AlertVariationTokens<OutputType>;
  };

export const alert: Required<AlertTokens<'default'>> = {
  // Default styles
  alignItems: { value: 'center' },
  justifyContent: { value: 'space-between' },
  color: { value: '{colors.font.primary.value}' },
  backgroundColor: { value: '{colors.background.tertiary.value}' },
  paddingBlock: { value: '{space.small.value}' },
  paddingInline: { value: '{space.medium.value}' },

  icon: {
    size: { value: '{fontSizes.xl.value}' },
  },

  heading: {
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
  },

  // Variations
  info: {
    color: { value: '{colors.font.info.value}' },
    backgroundColor: { value: '{colors.background.info.value}' },
  },

  error: {
    color: { value: '{colors.font.error.value}' },
    backgroundColor: { value: '{colors.background.error.value}' },
  },

  warning: {
    color: { value: '{colors.font.warning.value}' },
    backgroundColor: { value: '{colors.background.warning.value}' },
  },

  success: {
    color: { value: '{colors.font.success.value}' },
    backgroundColor: { value: '{colors.background.success.value}' },
  },
};
