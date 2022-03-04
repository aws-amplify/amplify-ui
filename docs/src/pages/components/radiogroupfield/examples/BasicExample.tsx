import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const BasicExample = () => (
  <RadioGroupField label="Language" name="language" defaultValue="html">
    <Radio value="html">html</Radio>
    <Radio value="css">css</Radio>
    <Radio value="javascript">javascript</Radio>
  </RadioGroupField>
);
