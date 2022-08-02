import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const ReadOnlyExample = () => (
  <RadioGroupField
    label="Read-only"
    name="read-only"
    defaultValue="love"
    isReadOnly
  >
    <Radio value="love">I love Amplify UI 😍</Radio>
    <Radio value="like">I like Amplify UI 👍</Radio>
    <Radio value="appreciate">I appreciate Amplify UI 🙏</Radio>
  </RadioGroupField>
);
