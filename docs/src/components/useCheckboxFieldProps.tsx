import { useState } from 'react';

import { CheckboxFieldProps } from '@aws-amplify/ui-react';

import { CheckboxFieldPropControlsProps } from './CheckboxFieldPropControls';

interface UseCheckboxFieldProps {
  (initialValues: CheckboxFieldProps): CheckboxFieldPropControlsProps;
}

export const useCheckboxFieldProps: UseCheckboxFieldProps = (initialValues) => {
  const [checked, setChecked] = useState<CheckboxFieldProps['checked']>(
    initialValues.checked
  );
  const [isDisabled, setIsDisabled] = useState<
    CheckboxFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [label, setLabel] = useState<CheckboxFieldProps['label']>(
    initialValues.label
  );
  const [name, setName] = useState<CheckboxFieldProps['name']>(
    initialValues.size
  );
  const [size, setSize] = useState<CheckboxFieldProps['size']>(
    initialValues.size
  );
  const [value, setValue] = useState<CheckboxFieldProps['value']>(
    initialValues.size
  );

  return {
    checked,
    children: label,
    setChecked,
    isDisabled,
    setIsDisabled,
    label,
    setLabel,
    name,
    setName,
    size,
    setSize,
    value,
    setValue,
  };
};
