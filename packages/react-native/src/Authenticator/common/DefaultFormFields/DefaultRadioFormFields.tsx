import React from 'react';
import { censorAllButFirstAndLast, censorPhoneNumber } from '@aws-amplify/ui';

import { Radio, RadioGroup } from '../../../primitives';
import { DefaultRadioFormFieldsProps } from './types';

const censorContactInformation = (name: string, value: string): string => {
  let censoredVal = value;
  if (name === 'email') {
    const splitEmail = value.split('@');
    const censoredName = censorAllButFirstAndLast(splitEmail[0]);

    censoredVal = `${censoredName}@${splitEmail[1]}`;
  } else if (name === 'phone_number') {
    censoredVal = censorPhoneNumber(value);
  }
  return censoredVal;
};

const DefaultRadioFormFields = ({
  fields,
  fieldContainerStyle,
  fieldLabelStyle,
  isPending,
  style,
}: DefaultRadioFormFieldsProps): JSX.Element => {
  return (
    <RadioGroup disabled={isPending} style={style}>
      {(fields ?? []).map(({ name, value, ...props }) => (
        <Radio
          {...props}
          key={value}
          // value has to be name, because Auth is only interested in the
          // string "email" or "phone_number", not the actual value
          value={name}
          label={censorContactInformation(name, value)}
          labelStyle={fieldLabelStyle}
          style={fieldContainerStyle}
        />
      ))}
    </RadioGroup>
  );
};

DefaultRadioFormFields.displayName = 'FormFields';

export default DefaultRadioFormFields;
