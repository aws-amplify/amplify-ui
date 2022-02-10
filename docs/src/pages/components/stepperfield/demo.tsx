import * as React from 'react';

import { StepperField } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import {
  StepperFieldPropControls,
  StepperFieldPropControlsProps,
} from './StepperFieldPropControls';
import { useStepperFieldProps } from './useStepperFieldProps';

const propsToCode = (props: StepperFieldPropControlsProps) => {
  return (
    `<StepperField
  max={${props.max}}
  min={${props.min}}
  step={${props.step}}` +
    (props.variation
      ? `\n  variation=${JSON.stringify(props.variation)}`
      : '') +
    (props.size ? `\n  size="${props.size}"` : '') +
    `
  label="${props.label}"` +
    (props.labelHidden ? `\n  labelHidden=${props.labelHidden}` : '') +
    `
/>`
  );
};

export const StepperFieldDemo = () => {
  const stepperFieldProps = useStepperFieldProps({
    label: 'Stepper',
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 1,
  });

  return (
    <Demo
      code={propsToCode(stepperFieldProps)}
      propControls={<StepperFieldPropControls {...stepperFieldProps} />}
    >
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
    </Demo>
  );
};
