import { RadioFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';

import { RadioFieldPropControlsProps } from './RadioFieldPropControls';

interface UseRadioFieldProps {
  (initialValues?: RadioFieldProps): RadioFieldPropControlsProps;
}

export const useRadioFieldProps: UseRadioFieldProps = (initialValues) => {
  const [direction, setDirection] = useState<RadioFieldProps['direction']>(
    initialValues.direction
  );
  const [isDisabled, setIsDisabled] = useState<RadioFieldProps['isDisabled']>(
    initialValues.isDisabled
  );
  const [label, setLabel] = useState<RadioFieldProps['label']>(
    initialValues.label
  );
  const [name, setName] = useState<RadioFieldProps['name']>(initialValues.name);
  const [size, setSize] = useState<RadioFieldProps['size']>(initialValues.size);

  return {
    ...initialValues,
    direction,
    label,
    name,
    size,
    isDisabled,
    setDirection,
    setIsDisabled,
    setLabel,
    setName,
    setSize,
  };
};
