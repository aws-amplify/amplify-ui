import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const DirectionExample = () => (
  <>
    <RadioGroupField label="Column" name="column">
      <Radio value="top">Top</Radio>
      <Radio value="to-column">To</Radio>
      <Radio value="bottom">Bottom</Radio>
    </RadioGroupField>
    <RadioGroupField label="Row" name="row" direction="row">
      <Radio value="left">Left</Radio>
      <Radio value="to-row">To</Radio>
      <Radio value="right">Right</Radio>
    </RadioGroupField>
  </>
);
