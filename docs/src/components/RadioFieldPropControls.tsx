import React from 'react';
import { Input, RadioFieldProps, SelectField } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface RadioFieldPropControlsProps extends RadioFieldProps {
  setDefaultValue: (
    value: React.SetStateAction<RadioFieldProps['defaultValue']>
  ) => void;
  setDirection: (
    value: React.SetStateAction<RadioFieldProps['direction']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<RadioFieldProps['isDisabled']>
  ) => void;
  setIsReadOnly: (
    value: React.SetStateAction<RadioFieldProps['isReadOnly']>
  ) => void;
  setLabel: (value: React.SetStateAction<RadioFieldProps['label']>) => void;
  setName: (value: React.SetStateAction<RadioFieldProps['name']>) => void;
  setSize: (value: React.SetStateAction<RadioFieldProps['size']>) => void;
}

interface RadioFieldPropControlsInterface {
  (props: RadioFieldPropControlsProps): JSX.Element;
}

export const RadioFieldPropControls: RadioFieldPropControlsInterface = ({
  defaultValue,
  setDefaultValue,
  direction,
  setDirection,
  isDisabled,
  setIsDisabled,
  isReadOnly,
  setIsReadOnly,
  label,
  setLabel,
  name,
  setName,
  size,
  setSize,
}) => {
  return (
    <DemoBox primitiveName="RadioField">
      <FieldLabeler id="label">
        <Input
          type="text"
          name="label"
          onChange={(event) => {
            setLabel(event.target.value as RadioFieldProps['label']);
          }}
        />
      </FieldLabeler>
      <FieldLabeler id="name">
        <Input
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value as RadioFieldProps['name']);
          }}
        />
      </FieldLabeler>
      <FieldLabeler id="defaultValue">
        <Input
          type="text"
          name="defaultValue"
          onChange={(event) => {
            setDefaultValue(
              event.target.value as RadioFieldProps['defaultValue']
            );
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
      <FieldLabeler id="isReadOnly">
        <Input
          type="checkbox"
          name="isReadOnly"
          onChange={(event) => {
            setIsReadOnly(
              Boolean(event.target.checked) as RadioFieldProps['isReadOnly']
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
