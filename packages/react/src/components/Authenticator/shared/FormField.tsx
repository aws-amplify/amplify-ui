import * as React from 'react';
import { FormFieldOptions, getErrors } from '@aws-amplify/ui';

import { PasswordField } from '../../../primitives/PasswordField';
import { PhoneNumberField } from '../../../primitives/PhoneNumberField';
import { TextField } from '../../../primitives/TextField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useStableId } from '../../../primitives/utils/useStableId';
import { ValidationErrors } from '../../shared/ValidationErrors';

export interface FormFieldProps extends Omit<FormFieldOptions, 'label'> {
  // label is a required prop for the UI field components used in FormField
  label: string;
  name: string;
}

export function FormField({
  autocomplete: autoComplete,
  dialCode,
  name,
  type,
  ...props
}: FormFieldProps): JSX.Element {
  const { validationErrors } = useAuthenticator(({ validationErrors }) => [
    validationErrors,
  ]);

  const errors = React.useMemo(
    () => getErrors(validationErrors[name]),
    [name, validationErrors]
  );
  const hasError = errors?.length > 0;
  const errorId = useStableId();
  const ariaDescribedBy = hasError ? errorId : undefined;

  if (type === 'tel') {
    return (
      <>
        <PhoneNumberField
          {...props}
          name={name}
          defaultDialCode={dialCode}
          dialCodeName="country_code"
          autoComplete={autoComplete}
          hasError={hasError}
          aria-describedby={ariaDescribedBy}
        />
        <ValidationErrors
          dataAttr="data-amplify-sign-up-errors"
          errors={errors}
          id={errorId}
        />
      </>
    );
  } else if (type === 'password') {
    return (
      <>
        <PasswordField
          {...props}
          name={name}
          autoComplete={autoComplete}
          hasError={hasError}
          aria-describedby={ariaDescribedBy}
        />
        <ValidationErrors
          dataAttr="data-amplify-sign-up-errors"
          errors={errors}
          id={errorId}
        />
      </>
    );
  } else {
    return (
      <>
        <TextField
          {...props}
          name={name}
          autoComplete={autoComplete}
          hasError={hasError}
          type={type}
          aria-describedby={ariaDescribedBy}
        />
        <ValidationErrors
          dataAttr="data-amplify-sign-up-errors"
          errors={errors}
          id={errorId}
        />
      </>
    );
  }
}
