import { SliderField } from '@aws-amplify/ui-react';

export const SliderFieldBasicsExample = () => {
  return (
    <SliderField
      label="Select your favorite odd number between 1 and 9"
      min={1}
      max={9}
      step={2}
      defaultValue={5}
    />
  );
};
