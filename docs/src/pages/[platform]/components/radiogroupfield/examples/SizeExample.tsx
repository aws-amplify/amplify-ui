import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const SizeExample = () => (
  <>
    <RadioGroupField legend="small" name="small" size="small" legendHidden>
      <Radio value="small">Small</Radio>
    </RadioGroupField>
    <RadioGroupField legend="default" name="default" legendHidden>
      <Radio value="default">Default</Radio>
    </RadioGroupField>
    <RadioGroupField legend="large" name="large" size="large" legendHidden>
      <Radio value="large">Large</Radio>
    </RadioGroupField>
  </>
);
