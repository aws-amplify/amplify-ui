import { FormFieldOptions, getErrors } from '@aws-amplify/ui';

import { PasswordField } from '../../../primitives/PasswordField';
import { PhoneNumberField } from '../../../primitives/PhoneNumberField';
import { TextField } from '../../../primitives/TextField';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { ValidationErrors } from './ValidationErrors';

export interface FormFieldProps {
  name: string;
  formFieldOptions: FormFieldOptions;
}
export function FormField({ name, formFieldOptions }: FormFieldProps) {
  const { validationErrors } = useAuthenticator((context) => [
    context.validationErrors,
  ]);
  const { type } = formFieldOptions;

  const errors = getErrors(validationErrors[name]);
  const hasError = errors?.length > 0;

  if (type === 'tel') {
    return (
      <>
        <PhoneNumberField
          name={name}
          label={formFieldOptions.label}
          placeholder={formFieldOptions.placeholder}
          defaultCountryCode={formFieldOptions.dialCode}
          countryCodeName="country_code"
          dialCodeList={formFieldOptions.dialCodeList}
          autoComplete={formFieldOptions.autocomplete}
          isRequired={formFieldOptions.isRequired}
          labelHidden={formFieldOptions.labelHidden}
          hasError={hasError}
        />
        <ValidationErrors errors={errors} />
      </>
    );
  } else if (type === 'password') {
    return (
      <>
        <PasswordField
          name={name}
          label={formFieldOptions.label}
          autoComplete={formFieldOptions.autocomplete}
          placeholder={formFieldOptions.placeholder}
          isRequired={formFieldOptions.isRequired}
          labelHidden={formFieldOptions.labelHidden}
          hasError={hasError}
        />
        <ValidationErrors errors={errors} />
      </>
    );
  } else {
    return (
      <>
        <TextField
          name={name}
          label={formFieldOptions.label}
          placeholder={formFieldOptions.placeholder}
          autoComplete={formFieldOptions.autocomplete}
          isRequired={formFieldOptions.isRequired}
          labelHidden={formFieldOptions.labelHidden}
          hasError={hasError}
          type={type}
        />
        <ValidationErrors errors={errors} />
      </>
    );
  }
}
