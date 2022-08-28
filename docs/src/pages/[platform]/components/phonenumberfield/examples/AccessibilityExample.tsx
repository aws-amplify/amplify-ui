import { PhoneNumberField } from '@aws-amplify/ui-react';

export const AccessibilityExample = () => (
  <PhoneNumberField
    label="Phone Number"
    labelHidden={true}
    defaultDialCode="+1"
    placeholder="Phone Number"
    dialCodeLabel="Dial code"
  />
);
