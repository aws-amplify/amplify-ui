import * as React from 'react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { CheckboxField, Flex, TextField } from '@aws-amplify/ui-react';

type FieldValue = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>['value'];
type FieldSetter = (event: any) => void;
type FieldName = string;
type ControlType = 'checkbox' | 'text' | string;
export type FieldControl = [FieldValue, FieldSetter, FieldName, ControlType];

export interface GetFieldControlsProps {
  typeName: string;
  fields: FieldControl[];
}

export const GetFieldControls = ({ fields }: GetFieldControlsProps) => {
  return (
    <Flex direction="column">
      {fields.map(([value, setter, name, type = 'text']) =>
        type === 'checkbox' ? (
          <CheckboxField
            name={name}
            value={value as string}
            checked={Boolean(value)}
            label={name}
            onChange={(event) => {
              setter(event.target.checked);
            }}
          />
        ) : (
          <TextField
            name={name}
            placeholder={`Set ${name}`}
            value={value}
            label={name}
            onChange={(event: any) => {
              setter(event.target.value);
            }}
          />
        )
      )}
    </Flex>
  );
};
