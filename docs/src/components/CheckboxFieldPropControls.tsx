import React from 'react';

import {
  CheckboxField,
  CheckboxFieldProps,
  TextField,
  SelectField,
} from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface CheckboxFieldPropControlsProps extends CheckboxFieldProps {
  setChecked: (
    value: React.SetStateAction<CheckboxFieldProps['checked']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<CheckboxFieldProps['isDisabled']>
  ) => void;
  setIsEmphasized: (
    value: React.SetStateAction<CheckboxFieldProps['isEmphasized']>
  ) => void;
  setLabel: (value: React.SetStateAction<CheckboxFieldProps['label']>) => void;
  setSize: (value: React.SetStateAction<CheckboxFieldProps['size']>) => void;
}

interface CheckboxFieldPropControlsInterface {
  (props: CheckboxFieldPropControlsProps): JSX.Element;
}

export const CheckboxFieldPropControls: CheckboxFieldPropControlsInterface = ({
  isDisabled,
  setIsDisabled,
  isEmphasized,
  setIsEmphasized,
  label,
  setLabel,
  size,
  setSize,
}) => {
  return (
    <DemoBox primitiveName="CheckboxField">
      <FieldLabeler id="label">
        <TextField
          id="label"
          name="label"
          label="label"
          labelHidden
          value={label}
          onChange={(e) =>
            setLabel(e.target.value as CheckboxFieldProps['label'])
          }
        />
      </FieldLabeler>
      <FieldLabeler id="size">
        <SelectField
          id="size"
          name="size"
          label="size"
          labelHidden
          placeholder="default"
          value={size}
          onChange={(e) =>
            setSize(e.target.value as CheckboxFieldProps['size'])
          }
        >
          <option value="small">small</option>
          <option value="large">large</option>
        </SelectField>
      </FieldLabeler>
      <FieldLabeler id="isEmphasized">
        <CheckboxField
          name="is-emphasized"
          value="true"
          checked={isEmphasized}
          onChange={(e) => setIsEmphasized(e.target.checked)}
        />
      </FieldLabeler>
      <FieldLabeler id="isDisabled">
        <CheckboxField
          name="is-disabled"
          value="true"
          checked={isDisabled}
          onChange={(e) => setIsDisabled(e.target.checked)}
        />
      </FieldLabeler>
    </DemoBox>
  );
};
