import * as React from 'react';

import {
  CheckboxField,
  SliderFieldProps,
  SelectField,
  TextField,
  Flex,
  StepperField,
} from '@aws-amplify/ui-react';

export interface SliderFieldPropControlsProps extends SliderFieldProps {
  setIsDisabled: (
    value: React.SetStateAction<SliderFieldProps['isDisabled']>
  ) => void;
  setIsValueHidden: (
    value: React.SetStateAction<SliderFieldProps['isValueHidden']>
  ) => void;
  setLabel: (value: React.SetStateAction<SliderFieldProps['label']>) => void;
  setLabelHidden: (
    value: React.SetStateAction<SliderFieldProps['labelHidden']>
  ) => void;
  setMax: (value: React.SetStateAction<SliderFieldProps['max']>) => void;
  setMin: (value: React.SetStateAction<SliderFieldProps['min']>) => void;
  setOrientation: (
    value: React.SetStateAction<SliderFieldProps['orientation']>
  ) => void;
  setStep: (value: React.SetStateAction<SliderFieldProps['step']>) => void;
  setTrackSize: (
    value: React.SetStateAction<SliderFieldProps['trackSize']>
  ) => void;
  setEmptyTrackColor: (
    value: React.SetStateAction<SliderFieldProps['emptyTrackColor']>
  ) => void;
  setFilledTrackColor: (
    value: React.SetStateAction<SliderFieldProps['filledTrackColor']>
  ) => void;
  setThumbColor: (
    value: React.SetStateAction<SliderFieldProps['thumbColor']>
  ) => void;
  setSize: (value: React.SetStateAction<SliderFieldProps['size']>) => void;
  setValue: (value: React.SetStateAction<SliderFieldProps['value']>) => void;
}

interface SliderFieldPropControlsInterface {
  (props: SliderFieldPropControlsProps): JSX.Element;
}

export const SliderFieldPropControls: SliderFieldPropControlsInterface = ({
  isDisabled,
  setIsDisabled,
  isValueHidden,
  setIsValueHidden,
  label,
  setLabel,
  labelHidden,
  setLabelHidden,
  max,
  setMax,
  min,
  setMin,
  orientation,
  setOrientation,
  step,
  setStep,
  trackSize,
  setTrackSize,
  emptyTrackColor,
  setEmptyTrackColor,
  filledTrackColor,
  setFilledTrackColor,
  thumbColor,
  setThumbColor,
  size,
  setSize,
}) => {
  return (
    <Flex direction="column">
      <TextField
        label="label"
        value={label as string}
        onChange={(event) =>
          setLabel(event.target.value as SliderFieldProps['label'])
        }
      />
      <StepperField
        label="min"
        value={min}
        min={0}
        max={49}
        step={1}
        onStepChange={setMin}
      />
      <StepperField
        label="max"
        value={max}
        min={50}
        max={100}
        step={1}
        onStepChange={setMax}
      />
      <StepperField
        label="step"
        value={step}
        min={1}
        max={10}
        step={1}
        onStepChange={setStep}
      />
      <SelectField
        label="size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as SliderFieldProps['size'])
        }
      >
        <option value="">default</option>
        <option value="large">large</option>
        <option value="small">small</option>
      </SelectField>
      <TextField
        label="trackSize"
        value={trackSize}
        placeholder="e.g., 6px"
        onChange={(event) =>
          setTrackSize(event.target.value as SliderFieldProps['trackSize'])
        }
      />
      <TextField
        label="emptyTrackColor"
        value={emptyTrackColor as string}
        placeholder="e.g., gray"
        onChange={(event) =>
          setEmptyTrackColor(
            event.target.value as SliderFieldProps['emptyTrackColor']
          )
        }
      />
      <TextField
        label="filledTrackColor"
        value={filledTrackColor as string}
        placeholder="e.g., blue"
        onChange={(event) =>
          setFilledTrackColor(
            event.target.value as SliderFieldProps['filledTrackColor']
          )
        }
      />
      <TextField
        label="thumbColor"
        value={thumbColor as string}
        placeholder="e.g., red"
        onChange={(event) =>
          setThumbColor(event.target.value as SliderFieldProps['thumbColor'])
        }
      />
      <SelectField
        label="orientation"
        value={orientation}
        onChange={(event) =>
          setOrientation(event.target.value as SliderFieldProps['orientation'])
        }
      >
        <option value="horizontal">horizontal</option>
        <option value="vertical">vertical</option>
      </SelectField>
      <CheckboxField
        name="isDisabled"
        label="isDisabled"
        value="yes"
        checked={isDisabled}
        onChange={(event) =>
          setIsDisabled(event.target.checked as SliderFieldProps['isDisabled'])
        }
      />
      <CheckboxField
        name="value-hidden"
        label="isValueHidden"
        value="yes"
        checked={isValueHidden}
        onChange={(event) =>
          setIsValueHidden(
            event.target.checked as SliderFieldProps['isValueHidden']
          )
        }
      />
      <CheckboxField
        name="label-hidden"
        label="labelHidden"
        value="yes"
        checked={labelHidden}
        onChange={(event) =>
          setLabelHidden(
            event.target.checked as SliderFieldProps['labelHidden']
          )
        }
      />
    </Flex>
  );
};
