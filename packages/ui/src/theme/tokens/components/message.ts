import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

type MessageColorThemeTokens<OutputType> = DesignTokenProperties<
  'backgroundColor' | 'color' | 'borderColor',
  OutputType
>;

type MessageVariationTokens<OutputType> = DesignTokenProperties<
  'backgroundColor' | 'color' | 'borderColor',
  OutputType
> & {
  info?: MessageColorThemeTokens<OutputType>;
  error?: MessageColorThemeTokens<OutputType>;
  warning?: MessageColorThemeTokens<OutputType>;
  success?: MessageColorThemeTokens<OutputType>;
};

type MessageTokenKey =
  | 'alignItems'
  | 'justifyContent'
  | 'color'
  | 'backgroundColor'
  | 'borderColor'
  | 'borderRadius'
  | 'borderStyle'
  | 'borderWidth'
  | 'lineHeight'
  | 'paddingBlock'
  | 'paddingInline';

export type MessageTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<MessageTokenKey, OutputType> & {
    icon?: DesignTokenProperties<'size', OutputType>;
    heading?: DesignTokenProperties<'fontSize' | 'fontWeight', OutputType>;
    dismiss?: DesignTokenProperties<'gap', OutputType>;
    plain?: MessageVariationTokens<OutputType>;
    outlined?: MessageVariationTokens<OutputType>;
    filled?: MessageVariationTokens<OutputType>;
  };

export const message: Required<MessageTokens<'default'>> = {
  // Default styles
  alignItems: { value: 'center' },
  backgroundColor: { value: '{colors.background.tertiary.value}' },
  borderColor: { value: 'transparent' },
  borderStyle: { value: 'solid' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderRadius: { value: '{radii.xs.value}' },
  color: { value: '{colors.font.primary.value}' },
  justifyContent: { value: 'flex-start' },
  paddingBlock: { value: '{space.small.value}' },
  paddingInline: { value: '{space.medium.value}' },
  lineHeight: { value: '{lineHeights.small.value}' },

  icon: {
    size: { value: '{fontSizes.xl.value}' },
  },

  heading: {
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
  },

  dismiss: {
    gap: { value: '{space.xxs.value}' },
  },

  // Variations
  plain: {
    color: { value: '{colors.font.primary.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    borderColor: { value: 'transparent' },
    info: {
      color: { value: '{colors.font.info.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: 'transparent' },
    },
    error: {
      color: { value: '{colors.font.error.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: 'transparent' },
    },
    success: {
      color: { value: '{colors.font.success.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: 'transparent' },
    },
    warning: {
      color: { value: '{colors.font.warning.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: 'transparent' },
    },
  },
  outlined: {
    color: { value: '{colors.font.primary.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    borderColor: { value: '{colors.border.primary.value}' },
    info: {
      color: { value: '{colors.font.info.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: '{colors.border.info.value}' },
    },
    error: {
      color: { value: '{colors.font.error.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: '{colors.border.error.value}' },
    },
    success: {
      color: { value: '{colors.font.success.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: '{colors.border.success.value}' },
    },
    warning: {
      color: { value: '{colors.font.warning.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      borderColor: { value: '{colors.border.warning.value}' },
    },
  },
  filled: {
    color: { value: '{colors.font.primary.value}' },
    backgroundColor: { value: '{colors.background.secondary.value}' },
    borderColor: { value: 'transparent' },
    info: {
      color: { value: '{colors.font.info.value}' },
      backgroundColor: { value: '{colors.background.info.value}' },
      borderColor: { value: 'transparent' },
    },
    error: {
      color: { value: '{colors.font.error.value}' },
      backgroundColor: { value: '{colors.background.error.value}' },
      borderColor: { value: 'transparent' },
    },
    success: {
      color: { value: '{colors.font.success.value}' },
      backgroundColor: { value: '{colors.background.success.value}' },
      borderColor: { value: 'transparent' },
    },
    warning: {
      color: { value: '{colors.font.warning.value}' },
      backgroundColor: { value: '{colors.background.warning.value}' },
      borderColor: { value: 'transparent' },
    },
  },
};
