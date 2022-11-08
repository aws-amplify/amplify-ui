import { DesignTokenProperties } from '../types/designToken';

type DividerSizeTokens<Output> = DesignTokenProperties<'borderWidth', Output>;

export type DividerTokens<Output = unknown> = DesignTokenProperties<
  'borderStyle' | 'borderColor' | 'borderWidth' | 'opacity',
  Output
> & {
  label?: DesignTokenProperties<
    'color' | 'paddingInline' | 'fontSize' | 'backgroundColor',
    Output
  >;
  small?: DividerSizeTokens<Output>;
  large?: DividerSizeTokens<Output>;
};

export const divider: DividerTokens = {
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  borderWidth: { value: '{borderWidths.medium.value}' },

  label: {
    color: { value: '{colors.font.tertiary.value}' },
    paddingInline: { value: '{space.medium.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
  },

  small: {
    borderWidth: { value: '{borderWidths.small.value}' },
  },

  large: {
    borderWidth: { value: '{borderWidths.large.value}' },
  },

  opacity: {
    value: '{opacities.60.value}',
  },
};
