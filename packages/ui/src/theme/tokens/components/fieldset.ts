import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type FieldsetSizeTokens<Output> = DesignTokenProperties<
  'fontSize' | 'gap',
  Output
>;

export type FieldsetOutlinedTokens<Output> = DesignTokenProperties<
  'padding' | 'borderColor' | 'borderWidth' | 'borderStyle',
  Output
>;

export type FieldsetHorizontalTokens<Output> = DesignTokenProperties<
  'flexDirection' | 'alignItems',
  Output
>;

export type FieldsetLegendTokens<Output> = DesignTokenProperties<
  'color' | 'fontWeight' | 'lineHeight',
  Output
>;

export type FieldsetTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'gap' | 'flexDirection' | 'fontSize', Output> & {
    legend?: FieldsetLegendTokens<Output>;
    horizontal?: FieldsetHorizontalTokens<Output>;
    outlined?: FieldsetOutlinedTokens<Output>;
    small?: FieldsetSizeTokens<Output>;
    large?: FieldsetSizeTokens<Output>;
  };

export const fieldset: Required<FieldsetTokens<'default'>> = {
  gap: { value: '{components.field.gap.value}' },
  flexDirection: {
    value: 'column',
  },
  fontSize: { value: '{components.field.fontSize.value}' },
  legend: {
    color: { value: '{colors.font.primary.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
    lineHeight: { value: '{lineHeights.small.value}' },
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlined: {
    padding: '{space.medium.value}',
    borderColor: '{colors.neutral.40.value}',
    borderWidth: '{borderWidths.small.value}',
    borderStyle: 'solid',
  },
  small: {
    fontSize: '{components.field.small.fontSize.value}',
    gap: '{components.field.large.small.value}',
  },
  large: {
    fontSize: '{components.field.large.fontSize.value}',
    gap: '{components.field.large.gap.value}',
  },
};
