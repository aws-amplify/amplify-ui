import { FormField } from '@aws-amplify/ui';
import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';
import { useAuthenticator } from '../hooks/useAuthenticator';

export interface AttributeFieldProps {
  name: string;
  formFieldOptions: FormField;
}
export function AttributeField({
  name,
  formFieldOptions,
}: AttributeFieldProps) {
  const { validationErrors } = useAuthenticator();
  const { type } = formFieldOptions;

  if (validationErrors[name]) console.log(validationErrors[name]);
  if (type === 'tel') {
    return (
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
        errorMessage={validationErrors[name]}
        hasError={!!validationErrors[name]}
      />
    );
  } else if (type === 'password') {
    return (
      <PasswordField
        name={name}
        label={formFieldOptions.label}
        autoComplete={formFieldOptions.autocomplete}
        placeholder={formFieldOptions.placeholder}
        isRequired={formFieldOptions.isRequired}
        labelHidden={formFieldOptions.labelHidden}
        errorMessage={validationErrors[name]}
        hasError={!!validationErrors[name]}
      />
    );
  } else {
    return (
      <TextField
        name={name}
        label={formFieldOptions.label}
        placeholder={formFieldOptions.placeholder}
        autoComplete={formFieldOptions.autocomplete}
        isRequired={formFieldOptions.isRequired}
        labelHidden={formFieldOptions.labelHidden}
        errorMessage={validationErrors[name]}
        hasError={!!validationErrors[name]}
        type={type}
      />
    );
  }
}
