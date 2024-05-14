import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldMultipleStateExample = () => (
  <SelectField
    label="Fruit"
    descriptiveText="What's your favorite fruit?"
    isMultiple={true}
  >
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
    <option value="pineapple">Pineapple</option>
    <option value="kiwi">Kiwi</option>
    <option value="tangerine">Tangerine</option>
  </SelectField>
);
