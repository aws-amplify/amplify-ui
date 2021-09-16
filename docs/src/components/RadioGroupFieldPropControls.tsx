import React from 'react';
import { RadioGroupFieldProps, SelectField } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface RadioGroupFieldPropControlsProps extends RadioGroupFieldProps {
  setDirection: (
    value: React.SetStateAction<RadioGroupFieldProps['direction']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<RadioGroupFieldProps['isDisabled']>
  ) => void;
  setLabel: (
    value: React.SetStateAction<RadioGroupFieldProps['label']>
  ) => void;
  setName: (value: React.SetStateAction<RadioGroupFieldProps['name']>) => void;
  setSize: (value: React.SetStateAction<RadioGroupFieldProps['size']>) => void;
}

interface RadioGroupFieldPropControlsInterface {
  (props: RadioGroupFieldPropControlsProps): JSX.Element;
}

export const RadioGroupFieldPropControls: RadioGroupFieldPropControlsInterface =
  ({
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
          <input
            type="text"
            name="label"
            value={label as string}
            onChange={(event) => {
              setLabel(event.target.value as RadioGroupFieldProps['label']);
            }}
          />
        </FieldLabeler>
        <FieldLabeler id="name">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value as RadioGroupFieldProps['name']);
            }}
          />
        </FieldLabeler>
        <FieldLabeler id="isDisabled">
          <input
            type="checkbox"
            name="isDisabled"
            onChange={(event) => {
              setIsDisabled(
                Boolean(
                  event.target.checked
                ) as RadioGroupFieldProps['isDisabled']
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
              setDirection(
                event.target.value as RadioGroupFieldProps['direction']
              )
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
              setSize(event.target.value as RadioGroupFieldProps['size'])
            }
          >
            <option value="small">small</option>
            <option value="large">large</option>
          </SelectField>
        </FieldLabeler>
      </DemoBox>
    );
  };
