import React from 'react';
import { Input, RadioFieldProps, SelectField } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface RadioFieldPropControlsProps extends RadioFieldProps {
  setDirection: (
    value: React.SetStateAction<RadioFieldProps['direction']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<RadioFieldProps['isDisabled']>
  ) => void;
  setLabel: (value: React.SetStateAction<RadioFieldProps['label']>) => void;
  setName: (value: React.SetStateAction<RadioFieldProps['name']>) => void;
  setSize: (value: React.SetStateAction<RadioFieldProps['size']>) => void;
}

interface RadioFieldPropControlsInterface {
  (props: RadioFieldPropControlsProps): JSX.Element;
}

export const RadioFieldPropControls: RadioFieldPropControlsInterface = ({
  setDirection,
  setIsDisabled,
  label,
  setLabel,
  name,
  setName,
  setSize,
}) => {
  return (
    <DemoBox primitiveName="RadioField">
      <FieldLabeler id="label">
        <Input
          type="text"
          name="label"
          value={label}
          onChange={(event) => {
            setLabel(event.target.value as RadioFieldProps['label']);
          }}
        />
      </FieldLabeler>
      <FieldLabeler id="name">
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value as RadioFieldProps['name']);
          }}
        />
      </FieldLabeler>
      <FieldLabeler id="isDisabled">
        <Input
          type="checkbox"
          name="isDisabled"
          onChange={(event) => {
            setIsDisabled(
              Boolean(event.target.checked) as RadioFieldProps['isDisabled']
            );
          }}
        />
      </FieldLabeler>
      <FieldLabeler id="direction">
        <SelectField
          label="direction"
          labelHidden
          name="direction"
          onChange={(event) =>
            setDirection(event.target.value as RadioFieldProps['direction'])
          }
        >
          <option value="column">column</option>
          <option value="row">row</option>
        </SelectField>
      </FieldLabeler>
      <FieldLabeler id="size">
        <SelectField
          label="size"
          labelHidden
          name="size"
          placeholder="default"
          onChange={(event) =>
            setSize(event.target.value as RadioFieldProps['size'])
          }
        >
          <option value="small">small</option>
          <option value="large">large</option>
        </SelectField>
      </FieldLabeler>
    </DemoBox>
  );
};
