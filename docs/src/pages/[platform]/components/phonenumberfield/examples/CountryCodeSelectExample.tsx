import { PhoneNumberField } from '@aws-amplify/ui-react';

export const CountryCodeSelectExample = () => (
  <PhoneNumberField
    label="Phone Number"
    defaultCountryCode="+7"
    dialCodeList={['+1', '+44', '+52', '+86', '+91']}
    countryCodeName="country_code"
    countryCodeLabel="Country Code"
    onCountryCodeChange={(e) =>
      alert(`Country/Region Code changed to: ${e.target.value}`)
    }
  />
);
