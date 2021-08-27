import * as React from 'react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldLabeler } from './FieldLabeler';
import classNames from 'classnames';
import {
  Button,
  Divider,
  IconKeyboardArrowDown,
  IconKeyboardArrowUp,
} from '@aws-amplify/ui-react';

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
  startCollapsed?: boolean;
}

export const GetFieldControls = ({
  typeName,
  fields,
  startCollapsed = true,
}: GetFieldControlsProps) => {
  const [collapsed, toggleCollapsed] = React.useState(startCollapsed);

  return (
    <fieldset className="">
      <legend
        onClick={() => toggleCollapsed(!collapsed)}
        className="font-bold p-1 w-full text-left"
      >
        <Button
          variation="link"
          isFullWidth={true}
          style={{ textAlign: 'left' }}
        >
          {collapsed ? (
            <>
              <IconKeyboardArrowDown
                style={{ width: '2rem', height: '2rem' }}
              />
              Show {typeName} props
            </>
          ) : (
            <>
              <IconKeyboardArrowUp style={{ width: '2rem', height: '2rem' }} />
              {typeName} props
            </>
          )}
        </Button>
      </legend>
      <Divider />
      <div
        className={classNames(
          'grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2',
          { hidden: collapsed }
        )}
      >
        {fields.map(([value, setter, name, type = 'text']) => (
          <FieldLabeler id={name} key={name}>
            {type === 'checkbox' ? (
              <input
                id={name}
                name={name}
                type={'checkbox'}
                placeholder={`Set ${name}`}
                checked={Boolean(value)}
                onChange={(event: any) => {
                  setter(event.target.checked);
                }}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={'text'}
                placeholder={`Set ${name}`}
                value={value}
                onChange={(event: any) => {
                  setter(event.target.value);
                }}
              />
            )}
          </FieldLabeler>
        ))}
      </div>
    </fieldset>
  );
};
