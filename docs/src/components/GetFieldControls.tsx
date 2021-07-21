import * as React from 'react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldLabeler } from './FieldLabeler';

type fieldValue = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>['value'];
type fieldSetter = (event: any) => void;
type fieldName = string;
export type FieldControl = [fieldValue, fieldSetter, fieldName];

export interface GetFieldControlsProps {
  typeName: string;
  fields: FieldControl[];
}

export const GetFieldControls = ({
  typeName,
  fields,
}: GetFieldControlsProps) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">{typeName} props:</legend>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2">
        {fields.map(([value, setter, name]) => (
          <FieldLabeler id={name} key={name}>
            <input
              id={name}
              name={name}
              type="text"
              placeholder={`Set ${name}`}
              value={value}
              onChange={(event: any) => {
                setter(event.target.value);
              }}
            />
          </FieldLabeler>
        ))}
      </div>
    </fieldset>
  );
};
