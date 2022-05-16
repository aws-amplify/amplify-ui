import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldValidationErrorExample = () => (
  <SelectField
    label="Fruit"
    labelHidden
    hasError={true}
    errorMessage="This is a required field."
  >
    <option value="uh oh">Uh oh</option>
  </SelectField>
);
