import { DesignTokenProperties } from '../types/designToken';

export type FieldMessagesTokens<Output = unknown> = {
  error?: DesignTokenProperties<'color' | 'fontSize', Output>;
  description?: DesignTokenProperties<
    'color' | 'fontSize' | 'fontStyle',
    Output
  >;
};

export const fieldmessages: FieldMessagesTokens = {
  error: {
    color: { value: '{colors.font.error.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  description: {
    color: { value: '{colors.font.secondary.value}' },
    fontStyle: { value: 'italic' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
};
