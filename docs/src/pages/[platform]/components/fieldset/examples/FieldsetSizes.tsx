import { Flex, Fieldset } from '@aws-amplify/ui-react';

export const FieldsetSizes = () => {
  return (
    <Flex direction="column">
      <Fieldset legend="Small fieldset" size="small">
        Small fieldset size content.
      </Fieldset>
      <Fieldset legend="Default fieldset">
        Default fieldset size content.
      </Fieldset>
      <Fieldset legend="Large fieldset" size="large">
        Large fieldset size content.
      </Fieldset>
    </Flex>
  );
};
