import React from 'react';

import type { DefaultRadioFormFieldsProps } from './types';

import { RadioGroup } from '../../../primitives/RadioGroup';
import { Radio } from '../../../primitives/Radio';

const DefaultSelectMfaTypeFormFields = ({
  fields = [],
  fieldContainerStyle,
  fieldLabelStyle,
  isPending,
  style,
}: DefaultRadioFormFieldsProps): React.JSX.Element => {
  // set initial value for radio field based on selected bool
  const initialValue = fields.find((field) => !!field.selected)?.value;
  return (
    <RadioGroup disabled={isPending} style={style} initialValue={initialValue}>
      {fields.map(({ value, label, ...props }) => (
        <Radio
          {...props}
          key={value}
          value={value}
          label={label}
          labelStyle={fieldLabelStyle}
          style={fieldContainerStyle}
        />
      ))}
    </RadioGroup>
  );
};

DefaultSelectMfaTypeFormFields.displayName = 'FormFields';

export default DefaultSelectMfaTypeFormFields;
