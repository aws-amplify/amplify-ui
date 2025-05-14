import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

export type FieldsetSizeTokens<Output> = DesignTokenProperties<'gap', Output>;

export type FieldsetOutlinedTokens<Output> = DesignTokenProperties<
  'padding' | 'borderColor' | 'borderWidth' | 'borderStyle',
  Output
> & {
  small?: DesignTokenProperties<'padding', Output>;
  large?: DesignTokenProperties<'padding', Output>;
};

export type FieldsetLegendTokens<Output> = DesignTokenProperties<
  'fontSize' | 'color' | 'fontWeight' | 'lineHeight',
  Output
> & {
  small?: DesignTokenProperties<'fontSize', Output>;
  large?: DesignTokenProperties<'fontSize', Output>;
};

export type FieldsetTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'backgroundColor' | 'gap' | 'flexDirection' | 'borderRadius',
    Output
  > & {
    legend?: FieldsetLegendTokens<Output>;
    outlined?: FieldsetOutlinedTokens<Output>;
    small?: FieldsetSizeTokens<Output>;
    large?: FieldsetSizeTokens<Output>;
  };

export const fieldset: Required<FieldsetTokens<'default'>> = {
  backgroundColor: { value: 'transparent' },
  borderRadius: { value: '{radii.xs.value}' },
  flexDirection: {
    value: 'column',
  },
  gap: { value: '{components.field.gap.value}' },
  legend: {
    color: { value: '{colors.font.primary.value}' },
    fontSize: { value: '{components.field.fontSize.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
    lineHeight: { value: '{lineHeights.medium.value}' },
    small: {
      fontSize: '{components.field.small.fontSize.value}',
    },
    large: {
      fontSize: '{components.field.large.fontSize.value}',
    },
  },
  outlined: {
    padding: '{space.medium.value}',
    borderColor: '{colors.neutral.40.value}',
    borderWidth: '{borderWidths.small.value}',
    borderStyle: 'solid',
    small: {
      padding: '{space.small.value}',
    },
    large: {
      padding: '{space.large.value}',
    },
  },
  small: {
    gap: '{components.field.small.gap.value}',
  },
  large: {
    gap: '{components.field.large.gap.value}',
  },
};
