import * as React from 'react';

import {
  CheckboxField,
  SliderFieldProps,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';

import { DemoBox } from './DemoBox';

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
  setTrackWidth: (
    value: React.SetStateAction<SliderFieldProps['trackWidth']>
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
}

export const SliderFieldPropControls: React.FC<SliderFieldPropControlsProps> =
  ({
    isDisabled,
    isValueHidden,
    label,
    labelHidden,
    max,
    min,
    orientation,
    step,
    trackWidth,
    emptyTrackColor,
    filledTrackColor,
    thumbColor,
    setEmptyTrackColor,
    setFilledTrackColor,
    setIsDisabled,
    setIsValueHidden,
    setLabel,
    setLabelHidden,
    setMax,
    setMin,
    setOrientation,
    setStep,
    setThumbColor,
    setTrackWidth,
  }) => {
    return (
      <DemoBox primitiveName="SliderField">
        <TextField
          label="label"
          value={label as string}
          onChange={(event) =>
            setLabel(event.target.value as SliderFieldProps['label'])
          }
        />
        <TextField
          type="number"
          label="min"
          value={min}
          onChange={(event) =>
            setMin(Number(event.target.value) as SliderFieldProps['min'])
          }
        />
        <TextField
          type="number"
          label="max"
          value={max}
          onChange={(event) =>
            setMax(Number(event.target.value) as SliderFieldProps['max'])
          }
        />
        <TextField
          type="number"
          label="step"
          value={step}
          onChange={(event) =>
            setStep(Number(event.target.value) as SliderFieldProps['step'])
          }
        />
        <TextField
          label="trackWidth"
          value={trackWidth}
          onChange={(event) =>
            setTrackWidth(event.target.value as SliderFieldProps['trackWidth'])
          }
        />
        <TextField
          label="emptyTrackColor"
          value={emptyTrackColor}
          onChange={(event) =>
            setEmptyTrackColor(
              event.target.value as SliderFieldProps['emptyTrackColor']
            )
          }
        />
        <TextField
          label="thumbColor"
          value={thumbColor}
          onChange={(event) =>
            setThumbColor(event.target.value as SliderFieldProps['thumbColor'])
          }
        />
        <TextField
          label="filledTrackColor"
          value={filledTrackColor}
          onChange={(event) =>
            setFilledTrackColor(
              event.target.value as SliderFieldProps['filledTrackColor']
            )
          }
        />
        <SelectField
          label="orientation"
          value={orientation}
          onChange={(event) =>
            setOrientation(
              event.target.value as SliderFieldProps['orientation']
            )
          }
        >
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </SelectField>
        <CheckboxField
          name="disabled"
          value="yes"
          checked={isDisabled}
          onChange={(event) => setIsDisabled(event.target.checked)}
        >
          isDisabled
        </CheckboxField>
        <CheckboxField
          name="value-hidden"
          value="yes"
          checked={isValueHidden}
          onChange={(event) => setIsValueHidden(event.target.checked)}
        >
          isValueHidden
        </CheckboxField>
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
  };
