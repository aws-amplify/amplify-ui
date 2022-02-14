import { SwitchField, useTheme } from '@aws-amplify/ui-react';

export const SwitchFieldTrackCheckedColorExample = () => {
  const { tokens } = useTheme();
  return (
    <SwitchField
      label="This is a switch"
      trackColor={`${tokens.colors.green[60]}`}
      defaultChecked={true}
    />
  );
};
