import { StepperField, IconsProvider } from '@aws-amplify/ui-react';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';

export const StepperFieldIconProviderExample = () => (
  <IconsProvider
    icons={{
      stepperField: {
        add: <FiPlusSquare />,
        remove: <FiMinusSquare />,
      },
    }}
  >
    <StepperField
      label="Themed stepper"
      defaultValue={0}
      min={0}
      max={10}
      step={1}
      labelHidden
    />
  </IconsProvider>
);
