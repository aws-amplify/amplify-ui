import { SwitchField, useTheme } from '@aws-amplify/ui-react';

export const SwitchFieldThumbColorExample = () => {
  const { tokens } = useTheme();
  return (
    <SwitchField
      label="This is a switch"
      thumbColor={tokens.colors.orange[10]}
    />
  );
};
