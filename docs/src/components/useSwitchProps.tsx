import { SwitchFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { SwitchPropControlsProps } from './SwitchPropControls';

export const useSwitchProps = (initialValues) => {
  const [thumbColor, setThumbColor] = useState<SwitchFieldProps['thumbColor']>(
    initialValues.thumbColor
  );
  const [trackColor, setTrackColor] = useState<SwitchFieldProps['trackColor']>(
    initialValues.trackColor
  );
  const [trackCheckedColor, setTrackCheckedColor] = useState<
    SwitchFieldProps['trackCheckedColor']
  >(initialValues.trackCheckedColor);
  const [isDisabled, setIsDisabled] = useState<SwitchFieldProps['isDisabled']>(
    initialValues.isDisabled
  );
  const [size, setSize] = useState<SwitchFieldProps['size']>(
    initialValues.size
  );
  const [label, setLabel] = useState<SwitchFieldProps['label']>(
    initialValues.label
  );
  const [isLabelHidden, setIsLabelHidden] = useState<
    SwitchFieldProps['isLabelHidden']
  >(initialValues.isLabelHidden);
  const [isChecked, setIsChecked] = useState<SwitchFieldProps['isChecked']>(
    initialValues.isChecked
  );

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
    isLabelHidden,
    setIsLabelHidden,
    isChecked,
    setIsChecked,
  };
};
