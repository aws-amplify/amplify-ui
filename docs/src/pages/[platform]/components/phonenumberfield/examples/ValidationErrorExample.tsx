import { PhoneNumberField } from '@aws-amplify/ui-react';

export const ValidationErrorExample = () => (
  <PhoneNumberField
    defaultCountryCode="+1"
    label="Phone number"
    defaultValue="1234"
    hasError={true}
    errorMessage="Not a valid phone number! 😱"
  />
);
