export interface FieldTokens {
  gap: never;
  fontSize: never;
  small: never;
  large: never;
  label: never;
}
export const field: FieldTokens = {
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
