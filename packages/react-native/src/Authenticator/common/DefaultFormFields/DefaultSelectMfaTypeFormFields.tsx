import React from 'react';

import { DefaultRadioFormFieldsProps } from './types';

import { RadioGroup } from '../../../primitives/RadioGroup';
import { Radio } from '../../../primitives/Radio';

const DefaultSelectMfaTypeFormFields = ({
  fields = [],
  fieldContainerStyle,
  fieldLabelStyle,
  isPending,
  style,
}: DefaultRadioFormFieldsProps): React.JSX.Element => {
  return (
    <RadioGroup disabled={isPending} style={style}>
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
