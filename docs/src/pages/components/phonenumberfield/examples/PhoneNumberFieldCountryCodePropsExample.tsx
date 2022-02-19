import { Flex, PhoneNumberField } from '@aws-amplify/ui-react';

export const PhoneNumberFieldCountryCodePropsExample = () => (
  <Flex direction="column">
    <PhoneNumberField
      label="Phone Number"
      defaultCountryCode="+7"
      countryCodeName="country_code"
      countryCodeLabel="Country Code"
      onCountryCodeChange={(e) => console.log(e.target.value)}
    />
  </Flex>
);
