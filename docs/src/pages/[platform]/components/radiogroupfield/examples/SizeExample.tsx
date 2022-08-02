import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const SizeExample = () => (
  <>
    <RadioGroupField label="small" name="small" size="small" labelHidden>
      <Radio value="small">Small</Radio>
    </RadioGroupField>
    <RadioGroupField label="default" name="default" labelHidden>
      <Radio value="default">Default</Radio>
    </RadioGroupField>
    <RadioGroupField label="large" name="large" size="large" labelHidden>
      <Radio value="large">Large</Radio>
    </RadioGroupField>
  </>
);
