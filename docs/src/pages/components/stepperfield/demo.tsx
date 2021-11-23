import * as React from 'react';

import { Flex, StepperField } from '@aws-amplify/ui-react';

import { StepperFieldPropControls } from '@/components/StepperFieldPropControls';
import { useStepperFieldProps } from '@/components/useStepperFieldProps';
import { Example } from '@/components/Example';

export const StepperFieldDemo = () => {
  const stepperFieldProps = useStepperFieldProps({
    label: 'Stepper',
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 1,
  });

  return (
    <Flex direction="column">
      <StepperFieldPropControls {...stepperFieldProps} />
      <Example>
        <StepperField
          label={stepperFieldProps.label}
          defaultValue={stepperFieldProps.defaultValue}
          max={stepperFieldProps.max}
          min={stepperFieldProps.min}
          size={stepperFieldProps.size}
          variation={stepperFieldProps.variation}
          step={stepperFieldProps.step}
          labelHidden={stepperFieldProps.labelHidden}
        />
      </Example>
    </Flex>
  );
};
