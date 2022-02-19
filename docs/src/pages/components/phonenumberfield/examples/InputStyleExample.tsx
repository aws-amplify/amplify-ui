import { PhoneNumberField, useTheme } from '@aws-amplify/ui-react';

export const InputStyleExample = () => {
  const { tokens } = useTheme();
  return (
    <PhoneNumberField
      defaultCountryCode="+1"
      label="Phone number"
      inputStyles={{
        border: `${tokens.borderWidths.small} solid ${tokens.colors.border.disabled}`,
        backgroundColor: tokens.colors.background.disabled,
      }}
    />
  );
};
