export interface FieldMessagesTokens {
  error: never;
  description: never;
}

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
