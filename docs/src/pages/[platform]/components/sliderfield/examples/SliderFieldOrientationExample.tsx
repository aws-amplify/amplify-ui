import { SliderField } from '@aws-amplify/ui-react';

export const SliderFieldOrientationExample = () => {
  return (
    <SliderField
      label="How tall is your cat (in inches)?"
      orientation="vertical"
      min={3}
      max={20}
      defaultValue={9}
    />
  );
};
