import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldSelectSizeExample = () => (
  <SelectField
    label="Fruit"
    descriptiveText="What's your favorite fruit?"
    selectSize={3}
  >
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
    <option value="pineapple">Pineapple</option>
    <option value="kiwi">Kiwi</option>
    <option value="tangerine">Tangerine</option>
  </SelectField>
);
