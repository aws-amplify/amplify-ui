import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const BasicExample = () => (
  <RadioGroupField label="Language" name="language" defaultValue="HTML">
    <Radio value="HTML">HTML</Radio>
    <Radio value="CSS">CSS</Radio>
    <Radio value="JavaScript">JavaScript</Radio>
  </RadioGroupField>
);
