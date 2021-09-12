import { RadioFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';

import { RadioFieldPropControlsProps } from './RadioFieldPropControls';

interface UseRadioFieldProps {
  (initialValues?: RadioFieldProps): RadioFieldPropControlsProps;
}

export const useRadioFieldProps: UseRadioFieldProps = (initialValues) => {
  const [defaultValue, setDefaultValue] = useState<
    RadioFieldProps['defaultValue']
  >(initialValues.defaultValue);
  const [direction, setDirection] = useState<RadioFieldProps['direction']>(
    initialValues.direction
  );
  const [isDisabled, setIsDisabled] = useState<RadioFieldProps['isDisabled']>(
    initialValues.isDisabled
  );
  const [isReadOnly, setIsReadOnly] = useState<RadioFieldProps['isReadOnly']>(
    initialValues.isReadOnly
  );
  const [label, setLabel] = useState<RadioFieldProps['label']>(
    initialValues.label
  );
  const [name, setName] = useState<RadioFieldProps['name']>(initialValues.name);
  const [size, setSize] = useState<RadioFieldProps['size']>(initialValues.size);

  return {
    defaultValue,
    direction,
    label,
    name,
    size,
    isDisabled,
    isReadOnly,
    setDefaultValue,
    setDirection,
    setIsDisabled,
    setIsReadOnly,
    setLabel,
    setName,
    setSize,
  };
};
