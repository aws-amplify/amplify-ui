import { PhoneNumberField } from '@aws-amplify/ui-react';

export const AccessibilityExample = () => (
  <PhoneNumberField
    label="Phone Number"
    labelHidden={true}
    defaultCountryCode="+1"
    placeholder="Phone Number"
    countryCodeLabel="Country code"
  />
);
