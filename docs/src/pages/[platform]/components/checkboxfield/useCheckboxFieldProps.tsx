import * as React from 'react';

import { CheckboxFieldProps, CheckboxField } from '@aws-amplify/ui-react';

import { CheckboxFieldPropControlsProps } from './CheckboxFieldPropControls';
import { demoState } from '@/utils/demoState';

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
  const [isIndeterminate, setIsIndeterminate] = React.useState<
    CheckboxFieldProps['isIndeterminate']
  >(initialValues.isIndeterminate);
  const [label, setLabel] = React.useState<CheckboxFieldProps['label']>(
    initialValues.label
  );
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

  React.useEffect(() => {
    demoState.set(CheckboxField.displayName, {
      checked,
      isDisabled,
      isIndeterminate,
      label,
      name,
      size,
      value,
      labelPosition,
    });
  }, [
    checked,
    isDisabled,
    isIndeterminate,
    label,
    name,
    size,
    value,
    labelPosition,
  ]);

  return React.useMemo(
    () => ({
      checked,
      children: label,
      setChecked,
      isDisabled,
      setIsDisabled,
      isIndeterminate,
      setIsIndeterminate,
      label,
      setLabel,
      labelPosition,
      setLabelPosition,
      name,
      setName,
      size,
      setSize,
      value,
      setValue,
    }),
    [
      checked,
      setChecked,
      isDisabled,
      setIsDisabled,
      isIndeterminate,
      setIsIndeterminate,
      label,
      setLabel,
      labelPosition,
      setLabelPosition,
      name,
      setName,
      size,
      setSize,
      value,
      setValue,
    ]
  );
};
