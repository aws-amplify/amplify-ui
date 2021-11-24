import * as React from 'react';

import { SliderFieldProps } from '@aws-amplify/ui-react';

import { SliderFieldPropControlsProps } from './SliderFieldPropControls';

export interface UseSliderFieldProps {
  (initialValues: SliderFieldProps): SliderFieldPropControlsProps;
}

export const useSliderFieldProps: UseSliderFieldProps = (initialValues) => {
  const [isDisabled, setIsDisabled] = React.useState(initialValues.isDisabled);
  const [isValueHidden, setIsValueHidden] = React.useState(
    initialValues.isValueHidden
  );
  const [label, setLabel] = React.useState(initialValues.label);
  const [labelHidden, setLabelHidden] = React.useState(
    initialValues.labelHidden
  );
  const [max, setMax] = React.useState(initialValues.max);
  const [min, setMin] = React.useState(initialValues.min);
  const [step, setStep] = React.useState(initialValues.step);
  const [orientation, setOrientation] = React.useState(
    initialValues.orientation
  );
  const [trackSize, setTrackSize] = React.useState(initialValues.trackSize);
  const [emptyTrackColor, setEmptyTrackColor] = React.useState(
    initialValues.emptyTrackColor
  );
  const [filledTrackColor, setFilledTrackColor] = React.useState(
    initialValues.filledTrackColor
  );
  const [thumbColor, setThumbColor] = React.useState(initialValues.thumbColor);
  const [size, setSize] = React.useState(initialValues.size);
  return {
    defaultValue: initialValues.defaultValue,
    isDisabled,
    isValueHidden,
    label,
    labelHidden,
    max,
    min,
    step,
    orientation,
    trackSize,
    emptyTrackColor,
    filledTrackColor,
    thumbColor,
    size,
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
    setTrackSize,
    setSize,
  };
};
