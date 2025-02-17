import React, { Fragment } from 'react';
import { getErrors } from '@aws-amplify/ui';

import { Radio, RadioGroup } from '../../../primitives';
import { DefaultFormFieldsProps } from './types';
import { View } from 'react-native';
import { isRadioFieldOptions } from '../../hooks/useFieldValues/utils';
import Field from './Field';
import { FieldErrors } from './FieldErrors';

const DefaultFormFields = ({
  fieldContainerStyle,
  fieldErrorsContainer,
  fieldErrorStyle,
  fieldStyle,
  fieldLabelStyle,
  isPending = false,
  validationErrors,
  fields = [],
  style,
}: DefaultFormFieldsProps): React.JSX.Element => {
  const formFields = fields.map((field) => {
    const errors = validationErrors
      ? getErrors(validationErrors?.[field.name])
      : [];
    const hasError = errors?.length > 0;

    if (isRadioFieldOptions(field)) {
      return (
        <Fragment key={field.name}>
          <RadioGroup
            disabled={isPending}
            style={style}
            // label={field.label}
          >
            {(field.radioOptions ?? []).map(({ label, value }) => {
              return (
                <Radio
                  {...field}
                  key={value}
                  value={value}
                  label={label}
                  labelStyle={fieldLabelStyle}
                  style={fieldContainerStyle}
                  onChange={field.onChange}
                />
              );
            })}
          </RadioGroup>
          <FieldErrors
            errors={errors}
            errorStyle={fieldErrorStyle}
            style={fieldErrorsContainer}
          />
        </Fragment>
      );
    }
    return (
      <Fragment key={field.name}>
        <Field
          {...field}
          disabled={isPending}
          error={hasError}
          fieldStyle={fieldStyle}
          key={field.name}
          style={fieldContainerStyle}
          type={field.type}
        />
        <FieldErrors
          errors={errors}
          errorStyle={fieldErrorStyle}
          style={fieldErrorsContainer}
        />
      </Fragment>
    );
  });

  return <View style={style}>{formFields}</View>;
};

DefaultFormFields.displayName = 'FormFields';

export default DefaultFormFields;
