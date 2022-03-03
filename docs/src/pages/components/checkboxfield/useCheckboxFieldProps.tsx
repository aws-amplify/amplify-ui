import * as React from 'react';

import { CheckboxFieldProps } from '@aws-amplify/ui-react';

import { CheckboxFieldPropControlsProps } from './CheckboxFieldPropControls';

interface UseCheckboxFieldProps {
  (initialValues: CheckboxFieldProps): CheckboxFieldPropControlsProps;
}

export const useCheckboxFieldProps: UseCheckboxFieldProps = (initialValues) => {
  const [checked, setChecked] = React.useState<CheckboxFieldProps['checked']>(
    initialValues.checked
  );
  const [isDisabled, setIsDisabled] = React.useState<
    CheckboxFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [label, setLabel] = React.useState<CheckboxFieldProps['label']>(
    initialValues.label
  );
  const [isLabelHidden, setIsLabelHidden] = React.useState<
    CheckboxFieldProps['isLabelHidden']
  >(initialValues.isLabelHidden);
  const [name, setName] = React.useState<CheckboxFieldProps['name']>(
    initialValues.size
  );
  const [size, setSize] = React.useState<CheckboxFieldProps['size']>(
    initialValues.size
  );
  const [value, setValue] = React.useState<CheckboxFieldProps['value']>(
    initialValues.size
  );
  const [labelPosition, setLabelPosition] = React.useState<
    CheckboxFieldProps['labelPosition']
  >(initialValues.labelPosition);

  return {
    checked,
    children: label,
    setChecked,
    isDisabled,
    setIsDisabled,
    label,
    setLabel,
    isLabelHidden,
    setIsLabelHidden,
    labelPosition,
    setLabelPosition,
    name,
    setName,
    size,
    setSize,
    value,
    setValue,
  };
};
