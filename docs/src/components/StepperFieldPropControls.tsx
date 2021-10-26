import * as React from 'react';

import {
  CheckboxField,
  StepperFieldProps,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';

import { DemoBox } from './DemoBox';
import { label } from '@aws-amplify/ui';

export interface StepperFieldPropControlsProps extends StepperFieldProps {
  setLabel: (min: React.SetStateAction<StepperFieldProps['label']>) => void;
  setLabelHidden: (
    labelHidden: React.SetStateAction<StepperFieldProps['labelHidden']>
  ) => void;
  setMax: (min: React.SetStateAction<StepperFieldProps['max']>) => void;
  setMin: (min: React.SetStateAction<StepperFieldProps['min']>) => void;
  setSize: (min: React.SetStateAction<StepperFieldProps['size']>) => void;
  setStep: (min: React.SetStateAction<StepperFieldProps['step']>) => void;
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
  }) => (
    <DemoBox primitiveName="StepperField">
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
      <CheckboxField
        name="label-hidden"
        value="yes"
        checked={labelHidden}
        onChange={(event) => setLabelHidden(event.target.checked)}
      >
        labelHidden
      </CheckboxField>
    </DemoBox>
  );
