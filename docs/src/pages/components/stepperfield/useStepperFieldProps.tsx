import * as React from 'react';

import { StepperField, StepperFieldProps } from '@aws-amplify/ui-react';

import { StepperFieldPropControlsProps } from './StepperFieldPropControls';
import { demoState } from '@/utils/demoState';

export interface UseStepperFieldProps {
  (initialValues: StepperFieldProps): StepperFieldPropControlsProps;
}

export const useStepperFieldProps: UseStepperFieldProps = (initialValues) => {
  const [label, setLabel] = React.useState(initialValues.label);
  const [labelHidden, setLabelHidden] = React.useState(
    initialValues.labelHidden
  );
  const [max, setMax] = React.useState(initialValues.max);
  const [min, setMin] = React.useState(initialValues.min);
  const [step, setStep] = React.useState(initialValues.step);
  const [size, setSize] = React.useState(initialValues.size);
  const [variation, setVariation] = React.useState(initialValues.variation);

  React.useEffect(() => {
    demoState.set(StepperField.displayName, {
      label,
      labelHidden,
      max,
      min,
      step,
      size,
      variation,
    });
  }, [label, labelHidden, max, min, step, size, variation]);

  return React.useMemo(
    () => ({
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      max,
      setMax,
      min,
      setMin,
      step,
      setStep,
      size,
      setSize,
      variation,
      setVariation,
    }),
    [
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      max,
      setMax,
      min,
      setMin,
      step,
      setStep,
      size,
      setSize,
      variation,
      setVariation,
    ]
  );
};
