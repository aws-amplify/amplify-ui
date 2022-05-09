import * as React from 'react';

import { StepperField } from '@aws-amplify/ui-react';

export const ControlledStepperFieldExample = () => {
  const [value, setValue] = React.useState(0);

  return (
    <StepperField
      label="Controlled stepper"
      min={0}
      max={10}
      step={1}
      value={value}
      onStepChange={setValue}
      labelHidden
    />
  );
};
