import { PhoneNumberField } from '@aws-amplify/ui-react';

export const PhoneNumberFieldVariationExample = () => {
  return (
    <>
      <PhoneNumberField label="Default" defaultCountryCode="+1" />
      <PhoneNumberField
        label="Quiet"
        variation="quiet"
        defaultCountryCode="+1"
      />
    </>
  );
};
