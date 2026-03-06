import React from 'react';
import type { ContactMethod } from '@aws-amplify/ui';
import { censorContactMethod } from '@aws-amplify/ui';

import { Radio, RadioGroup } from '../../../primitives';
import type { DefaultRadioFormFieldsProps } from './types';

interface AttributeMap {
  email: ContactMethod;
  phone_number: ContactMethod;
}

const attributeMap: AttributeMap = {
  email: 'Email',
  phone_number: 'Phone Number',
};

const DefaultVerifyUserFormFields = ({
  fields = [],
  fieldContainerStyle,
  fieldLabelStyle,
  isPending,
  style,
}: DefaultRadioFormFieldsProps): React.JSX.Element => {
  // set initial value for radio field based on selected bool
  const initialValue = fields.find((field) => !!field.selected)?.name;
  return (
    <RadioGroup disabled={isPending} style={style} initialValue={initialValue}>
      {fields.map(({ name, value, ...props }) => {
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

DefaultVerifyUserFormFields.displayName = 'FormFields';

export default DefaultVerifyUserFormFields;
