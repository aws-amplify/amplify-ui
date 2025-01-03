import React from 'react';
import { censorContactMethod, ContactMethod } from '@aws-amplify/ui';

import { Radio, RadioGroup } from '../../../primitives';
import { DefaultRadioFormFieldsProps } from './types';

interface AttributeMap {
  email: ContactMethod;
  phone_number: ContactMethod;
}

const attributeMap: AttributeMap = {
  email: 'Email',
  phone_number: 'Phone Number',
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
      {(fields ?? []).map(({ name, value, ...props }) => {
        const attributeType = attributeMap[name as keyof AttributeMap];

        return (
          <Radio
            {...props}
            key={value}
            // value has to be name, because Auth is only interested in the
            // string "email" or "phone_number", not the actual value
            value={name}
            label={censorContactMethod(attributeType, value)}
            labelStyle={fieldLabelStyle}
            style={fieldContainerStyle}
          />
        );
      })}
    </RadioGroup>
  );
};

DefaultRadioFormFields.displayName = 'FormFields';

export default DefaultRadioFormFields;
