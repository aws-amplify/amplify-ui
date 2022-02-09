import { SwitchFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

export const useSwitchProps = (initialValues) => {
  const [thumbColor, setThumbColor] = React.useState<
    SwitchFieldProps['thumbColor']
  >(initialValues.thumbColor);
  const [trackColor, setTrackColor] = React.useState<
    SwitchFieldProps['trackColor']
  >(initialValues.trackColor);
  const [trackCheckedColor, setTrackCheckedColor] = React.useState<
    SwitchFieldProps['trackCheckedColor']
  >(initialValues.trackCheckedColor);
  const [isDisabled, setIsDisabled] = React.useState<
    SwitchFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [size, setSize] = React.useState<SwitchFieldProps['size']>(
    initialValues.size
  );
  const [label, setLabel] = React.useState<SwitchFieldProps['label']>(
    initialValues.label
  );
  const [isLabelHidden, setIsLabelHidden] = React.useState<
    SwitchFieldProps['isLabelHidden']
  >(initialValues.isLabelHidden);
  const [isChecked, setIsChecked] = React.useState<
    SwitchFieldProps['isChecked']
  >(initialValues.isChecked);
  const [labelPosition, setLabelPosition] = React.useState<
    SwitchFieldProps['labelPosition']
  >(initialValues.labelPosition);

  return {
    thumbColor,
    setThumbColor,
    trackColor,
    setTrackColor,
    trackCheckedColor,
    setTrackCheckedColor,
    isDisabled,
    setIsDisabled,
    size,
    setSize,
    label,
    setLabel,
    labelPosition,
    setLabelPosition,
    isLabelHidden,
    setIsLabelHidden,
    isChecked,
    setIsChecked,
  };
};
