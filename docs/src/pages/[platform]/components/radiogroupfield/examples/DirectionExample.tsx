import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const DirectionExample = () => (
  <>
    <RadioGroupField legend="Column" name="column">
      <Radio value="top">Top</Radio>
      <Radio value="to-column">To</Radio>
      <Radio value="bottom">Bottom</Radio>
    </RadioGroupField>
    <RadioGroupField legend="Row" name="row" direction="row">
      <Radio value="left">Left</Radio>
      <Radio value="to-row">To</Radio>
      <Radio value="right">Right</Radio>
    </RadioGroupField>
  </>
);
