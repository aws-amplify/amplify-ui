import * as React from 'react';

import {
  CheckboxField,
  Flex,
  StepperFieldProps,
  SelectField,
  TextField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface StepperFieldPropControlsProps extends StepperFieldProps {
  setVariation: (
    value: React.SetStateAction<StepperFieldProps['variation']>
  ) => void;
  setLabel: (value: React.SetStateAction<StepperFieldProps['label']>) => void;
  setLabelHidden: (
    value: React.SetStateAction<StepperFieldProps['labelHidden']>
  ) => void;
  setMax: (value: React.SetStateAction<StepperFieldProps['max']>) => void;
  setMin: (value: React.SetStateAction<StepperFieldProps['min']>) => void;
  setSize: (value: React.SetStateAction<StepperFieldProps['size']>) => void;
  setStep: (value: React.SetStateAction<StepperFieldProps['step']>) => void;
  setIsDisabled: (
    value: React.SetStateAction<StepperFieldProps['isDisabled']>
  ) => void;
}

export const StepperFieldPropControls: React.FC<StepperFieldPropControlsProps> =
  ({
    label,
    setLabel,
    labelHidden,
    setLabelHidden,
    max,
    setMax,
    min,
    setMin,
    size,
    setSize,
    step,
    setStep,
    variation,
    setVariation,
    isDisabled,
    setIsDisabled,
  }) => (
    <Flex direction="column">
      <TextField
        label="label"
        value={label as string}
        onChange={(event) =>
          setLabel(event.target.value as StepperFieldProps['label'])
        }
      />
      <TextField
        type="number"
        label="min"
        value={min}
        onChange={(event) =>
          setMin(Number(event.target.value) as StepperFieldProps['min'])
        }
      />
      <TextField
        type="number"
        label="max"
        value={max}
        onChange={(event) =>
          setMax(Number(event.target.value) as StepperFieldProps['max'])
        }
      />
      <TextField
        type="number"
        label="step"
        value={step}
        onChange={(event) =>
          setStep(Number(event.target.value) as StepperFieldProps['step'])
        }
      />
      <SelectField
        label="size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as StepperFieldProps['size'])
        }
      >
        <option value="default">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SelectField
        label="variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as StepperFieldProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="quiet">quiet</option>
      </SelectField>
      <CheckboxField
        name="label-hidden"
        value="yes"
        checked={labelHidden}
        onChange={(event) => setLabelHidden(event.target.checked)}
        label="labelHidden"
      />
      <SwitchField
        label="isDisabled"
        isChecked={isDisabled}
        labelPosition="end"
        onChange={(event) => {
          setIsDisabled(
            event.target.checked as StepperFieldProps['isDisabled']
          );
        }}
      />
    </Flex>
  );
