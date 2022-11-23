import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type FieldSizeTokens<Output> = DesignTokenProperties<
  'fontSize' | 'gap',
  Output
>;

export type FieldTokens<Output extends OutputVariantKey> =
  FieldSizeTokens<Output> & {
    small?: FieldSizeTokens<Output>;
    large?: FieldSizeTokens<Output>;
    label?: DesignTokenProperties<'color', Output>;
  };

export const field: Required<FieldTokens<'default'>> = {
  // default styles
  gap: { value: '{space.xs.value}' },
  fontSize: { value: '{fontSizes.medium.value}' },

  // Adjust base fontSize and gap for small and large sizes
  small: {
    gap: { value: '{space.xxxs.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  large: {
    gap: { value: '{space.small.value}' },
    fontSize: { value: '{fontSizes.large.value}' },
  },

  label: {
    color: { value: '{colors.font.secondary.value}' },
  },
};
