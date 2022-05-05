import { SliderField } from '@aws-amplify/ui-react';
import * as React from 'react';

export const ControlledSliderFieldExample = () => {
  const [value, setValue] = React.useState<number>(50);

  return (
    <SliderField label="Controlled slider" value={value} onChange={setValue} />
  );
};
