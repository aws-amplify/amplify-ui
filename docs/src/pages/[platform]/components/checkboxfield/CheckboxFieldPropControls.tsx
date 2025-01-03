import * as React from 'react';

import {
  CheckboxFieldProps,
  TextField,
  SelectField,
  SwitchField,
  Flex,
} from '@aws-amplify/ui-react';

export interface CheckboxFieldPropControlsProps extends CheckboxFieldProps {
  setChecked: (
    value: React.SetStateAction<CheckboxFieldProps['checked']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<CheckboxFieldProps['isDisabled']>
  ) => void;
  setIsIndeterminate: (
    value: React.SetStateAction<CheckboxFieldProps['isIndeterminate']>
  ) => void;
  setLabel: (value: React.SetStateAction<CheckboxFieldProps['label']>) => void;
  setSize: (value: React.SetStateAction<CheckboxFieldProps['size']>) => void;
  setLabelPosition: (
    value: React.SetStateAction<CheckboxFieldProps['labelPosition']>
  ) => void;
}

interface CheckboxFieldPropControlsInterface {
  (props: CheckboxFieldPropControlsProps): JSX.Element;
}

export const CheckboxFieldPropControls: CheckboxFieldPropControlsInterface = ({
  isDisabled,
  setIsDisabled,
  isIndeterminate,
  setIsIndeterminate,
  label,
  setLabel,
  labelPosition,
  setLabelPosition,
  size,
  setSize,
}) => {
  return (
    <Flex direction="column">
      <TextField
        id="label"
        name="label"
        label="label"
        value={label as string}
        onChange={(e) =>
          setLabel(e.target.value as CheckboxFieldProps['label'])
        }
      />
      <SelectField
        id="size"
        name="size"
        label="size"
        placeholder="default"
        value={size}
        onChange={(e) => setSize(e.target.value as CheckboxFieldProps['size'])}
      >
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>
      <SelectField
        id="labelPosition"
        name="labelPosition"
        label="labelPosition"
        placeholder="default"
        value={labelPosition}
        onChange={(e) =>
          setLabelPosition(
            e.target.value as CheckboxFieldProps['labelPosition']
          )
        }
      >
        <option value="start">start</option>
        <option value="end">end</option>
        <option value="top">top</option>
        <option value="bottom">bottom</option>
      </SelectField>
      <SwitchField
        name="is-disabled"
        label="isDisabled"
        isChecked={isDisabled}
        onChange={(e) => setIsDisabled(e.target.checked)}
      />
      <SwitchField
        name="is-indeterminate"
        label="isIndeterminate"
        isChecked={isIndeterminate}
        onChange={(e) => setIsIndeterminate(e.target.checked)}
      />
    </Flex>
  );
};
