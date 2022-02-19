import { TextAreaField, useTheme } from '@aws-amplify/ui-react';

export const TextAreaFieldInputStyleExample = () => {
  const { tokens } = useTheme();
  return (
    <TextAreaField
      label="Address:"
      inputStyles={{
        padding: tokens.space.large,
        backgroundColor: tokens.colors.brand.primary[80],
        color: tokens.colors.font.inverse,
      }}
    />
  );
};
