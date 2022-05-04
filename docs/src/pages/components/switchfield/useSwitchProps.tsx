import { SwitchField, SwitchFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { demoState } from '@/utils/demoState';

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
  const [isChecked, setIsChecked] = React.useState<
    SwitchFieldProps['isChecked']
  >(initialValues.isChecked);
  const [labelPosition, setLabelPosition] = React.useState<
    SwitchFieldProps['labelPosition']
  >(initialValues.labelPosition);

  React.useEffect(() => {
    demoState.set(SwitchField.displayName, {
      thumbColor,
      trackColor,
      trackCheckedColor,
      isDisabled,
      size,
      label,
      isChecked,
      labelPosition,
    });
  }, [
    thumbColor,
    trackColor,
    trackCheckedColor,
    isDisabled,
    size,
    label,
    isChecked,
    labelPosition,
  ]);

  return React.useMemo(
    () => ({
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
      isChecked,
      setIsChecked,
    }),
    [
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
      isChecked,
      setIsChecked,
    ]
  );
};
