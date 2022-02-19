import { Flex, PhoneNumberField, Button } from '@aws-amplify/ui-react';

export const PhoneNumberFieldSizeExample = () => (
  <Flex direction="column" gap="1rem">
    <Flex>
      <PhoneNumberField
        defaultCountryCode="+1"
        label="Small"
        size="small"
        labelHidden={true}
      />
      <Button size="small">Small</Button>
    </Flex>
    <Flex>
      <PhoneNumberField
        defaultCountryCode="+1"
        label="Default"
        labelHidden={true}
      />
      <Button>Default</Button>
    </Flex>
    <Flex>
      <PhoneNumberField
        defaultCountryCode="+1"
        label="Large"
        size="large"
        labelHidden={true}
      />
      <Button size="large">Large</Button>
    </Flex>
  </Flex>
);
