import React, { Fragment } from 'react';
import { View } from 'react-native';

import { getErrors } from '@aws-amplify/ui';
import { DefaultComponents, TextFieldOptionsType } from '../../Defaults/types';
import { FieldErrors } from './FieldErrors';
import { styles } from './styles';
import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';

const DefaultFormFields: DefaultComponents<TextFieldOptionsType>[keyof DefaultComponents]['FormFields'] =
  ({ fields, isPending, validationErrors }) => {
    const fieldStyle = styles.field;
    const formFields = fields.map(({ name, type, ...field }) => {
      const errors = validationErrors
        ? getErrors(validationErrors?.[name])
        : [];

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
            autoCapitalize="none"
            // disabled style is applying to Label
            disabled={isPending}
            error={hasError}
            key={name}
            style={fieldStyle}
          />
          <FieldErrors errors={errors} style={styles.error} />
        </Fragment>
      );
    });
    return <View>{formFields}</View>;
  };

DefaultFormFields.displayName = 'FormFields';

export default DefaultFormFields;
