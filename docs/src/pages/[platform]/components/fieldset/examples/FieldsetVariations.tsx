import { Flex, Fieldset } from '@aws-amplify/ui-react';

export const FieldsetVariations = () => {
  return (
    <Flex direction="column">
      <Fieldset legend="Outlined fieldset" variation="outlined">
        Outlined fieldset variation content.
      </Fieldset>
      <Fieldset legend="Plain fieldset" variation="plain">
        Plain fieldset variation content.
      </Fieldset>
    </Flex>
  );
};
