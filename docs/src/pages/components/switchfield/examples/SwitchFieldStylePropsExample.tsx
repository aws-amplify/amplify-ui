import { SwitchField, useTheme } from '@aws-amplify/ui-react';

export const SwitchFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <SwitchField
        label="This is a switch"
        style={{ fontSize: `${tokens.fontSizes.xs}` }}
      />
      <SwitchField label="This is a switch" fontSize={tokens.fontSizes.xs} />
    </>
  );
};
