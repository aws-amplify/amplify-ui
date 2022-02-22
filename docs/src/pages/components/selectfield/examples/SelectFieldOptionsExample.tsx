import { SelectField, Flex } from '@aws-amplify/ui-react';

export const SelectFieldOptionsExample = () => (
  <Flex direction="column">
    <SelectField
      label="Animals"
      options={['lions', 'tigers', 'bears']}
    ></SelectField>

    <SelectField label="This is the same as the example above">
      <option value="lions" label="lions">
        lions
      </option>
      <option value="tigers" label="tigers">
        tigers
      </option>
      <option value="bears" label="bears">
        bears
      </option>
    </SelectField>
  </Flex>
);
