import * as React from 'react';
import { RadioGroupFieldProps } from '@aws-amplify/ui-react';

import { RadioGroupFieldPropControlsProps } from './RadioGroupFieldPropControls';

interface UseRadioGroupFieldProps {
  (initialValues?: RadioGroupFieldProps): RadioGroupFieldPropControlsProps;
}

export const useRadioGroupFieldProps: UseRadioGroupFieldProps = (
  initialValues
) => {
  const [direction, setDirection] = React.useState<
    RadioGroupFieldProps['direction']
  >(initialValues.direction);
  const [isDisabled, setIsDisabled] = React.useState<
    RadioGroupFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [label, setLabel] = React.useState<RadioGroupFieldProps['label']>(
    initialValues.label
  );
  const [name, setName] = React.useState<RadioGroupFieldProps['name']>(
    initialValues.name
  );
  const [size, setSize] = React.useState<RadioGroupFieldProps['size']>(
    initialValues.size
  );
  const [labelPosition, setLabelPosition] = React.useState<
    RadioProps['labelPosition']
  >(initialValues.labelPosition);

  return {
    ...initialValues,
    direction,
    label,
    labelPosition,
    name,
    size,
    isDisabled,
    setDirection,
    setIsDisabled,
    setLabel,
    setName,
    setSize,
    setLabelPosition,
  };
};
