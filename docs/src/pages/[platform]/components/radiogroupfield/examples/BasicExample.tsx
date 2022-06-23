import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const BasicExample = () => (
  <RadioGroupField label="Animal" name="animal" defaultValue="HTML">
    <Radio value="Dog">Dog</Radio>
    <Radio value="Cat">Cat</Radio>
    <Radio value="Bird">Bird</Radio>
  </RadioGroupField>
);
