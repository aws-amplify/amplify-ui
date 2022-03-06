import { FormFieldOptions } from '@aws-amplify/ui';
import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';
import { useAuthenticator } from '../hooks/useAuthenticator';

export interface AttributeFieldProps {
  name: string;
  formFieldOptions: FormFieldOptions;
}
export function AttributeField({
  name,
  formFieldOptions,
}: AttributeFieldProps) {
  const { validationErrors, updateBlur, hasValidationErrors } =
    useAuthenticator();
  const { type } = formFieldOptions;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  if (validationErrors[name]) console.log(validationErrors[name]);
  if (type === 'tel') {
    return (
      <PhoneNumberField
        name={name}
        label={formFieldOptions.label}
        placeholder={formFieldOptions.placeholder}
        defaultCountryCode={formFieldOptions.dialCode}
        dialCodeList={formFieldOptions.dialCodeList}
        autoComplete={formFieldOptions.autocomplete}
        isRequired={formFieldOptions.isRequired}
        labelHidden={formFieldOptions.labelHidden}
        errorMessage={validationErrors[name]}
        hasError={!!validationErrors[name]}
        onBlur={handleBlur}
      />
    );
  } else if (type === 'password') {
    return (
      <PasswordField
        name={name}
        label={formFieldOptions.label}
        placeholder={formFieldOptions.placeholder}
        isRequired={formFieldOptions.isRequired}
        labelHidden={formFieldOptions.labelHidden}
        errorMessage={validationErrors[name]}
        hasError={!!validationErrors[name]}
        onBlur={handleBlur}
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
        onBlur={handleBlur}
      />
    );
  }
}
