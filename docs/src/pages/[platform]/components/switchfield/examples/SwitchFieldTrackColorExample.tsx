import { SwitchField, useTheme } from '@aws-amplify/ui-react';

export const SwitchFieldTrackColorExample = () => {
  const { tokens } = useTheme();
  return (
    <SwitchField label="This is a switch" trackColor={tokens.colors.blue[60]} />
  );
};
