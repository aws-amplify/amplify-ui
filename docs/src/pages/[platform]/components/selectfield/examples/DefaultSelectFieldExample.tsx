import { SelectField } from '@aws-amplify/ui-react';

export const DefaultSelectFieldExample = () => (
  <SelectField label="Fruit">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
    <option value="zucchini" disabled>
      Zucchini
    </option>
  </SelectField>
);
