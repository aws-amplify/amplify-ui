import { TextField, useTheme } from '@aws-amplify/ui-react';

export const TextFieldInputStyleExample = () => {
  const { tokens } = useTheme();
  return (
    <TextField
      label="Name"
      inputStyles={{
        padding: tokens.space.large,
        backgroundColor: tokens.colors.brand.primary[80],
        color: tokens.colors.font.inverse,
      }}
    />
  );
};
