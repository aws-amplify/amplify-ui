import { PhoneNumberField } from '@aws-amplify/ui-react';

export const DialCodeSelectExample = () => (
  <PhoneNumberField
    label="Phone Number"
    defaultDialCode="+7"
    dialCodeList={['+1', '+44', '+52', '+86', '+91']}
    dialCodeName="dial_code"
    dialCodeLabel="Dial Code"
    onDialCodeChange={(e) => alert(`Dial Code changed to: ${e.target.value}`)}
  />
);
