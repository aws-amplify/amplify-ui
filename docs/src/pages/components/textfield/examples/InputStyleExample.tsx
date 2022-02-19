import { Text, TextField, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
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
