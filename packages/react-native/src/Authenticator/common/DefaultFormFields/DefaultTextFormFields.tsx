import React, { Fragment } from 'react';
import { View } from 'react-native';

import { getErrors } from '@aws-amplify/ui';

import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';

import { FieldErrors } from './FieldErrors';
import { DefaultTextFormFieldsComponent } from './types';

const DefaultTextFormFields: DefaultTextFormFieldsComponent = ({
  fieldContainerStyle,
  fieldErrorsContainer,
  fieldErrorStyle,
  fieldStyle,
  fields = [],
  isPending,
  style,
  validationErrors,
}) => {
  const formFields = fields.map(({ name, type, ...field }) => {
    const errors = validationErrors ? getErrors(validationErrors?.[name]) : [];

    const hasError = errors?.length > 0;

    const Field =
      type === 'password'
        ? PasswordField
        : type === 'phone'
        ? PhoneNumberField
        : TextField;

    return (
      <Fragment key={name}>
        <Field
          {...field}
          disabled={isPending}
          error={hasError}
          fieldStyle={fieldStyle}
          key={name}
          style={fieldContainerStyle}
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

DefaultTextFormFields.displayName = 'DefaultTextFormFields';

export default DefaultTextFormFields;
