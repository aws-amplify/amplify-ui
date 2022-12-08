import { PhoneNumberField, Flex, Button } from '@aws-amplify/ui-react';

export const SizeExample = () => (
  <Flex direction="column" gap="1rem">
    <Flex>
      <PhoneNumberField
        defaultDialCode="+1"
        label="Small"
        size="small"
        labelHidden
      />
      <Button size="small">Small</Button>
    </Flex>
    <Flex>
      <PhoneNumberField defaultDialCode="+1" label="Default" labelHidden />
      <Button>Default</Button>
    </Flex>
    <Flex>
      <PhoneNumberField
        defaultDialCode="+1"
        label="Large"
        size="large"
        labelHidden
      />
      <Button size="large">Large</Button>
    </Flex>
  </Flex>
);
