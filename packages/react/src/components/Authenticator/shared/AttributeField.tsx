import { FormFieldOptions } from '@aws-amplify/ui';
import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';

export interface AttributeFieldProps {
  name: string;
  formFieldOptions: FormFieldOptions;
}
export function AttributeField({
  name,
  formFieldOptions,
}: AttributeFieldProps) {
  const { type } = formFieldOptions;

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
      />
    );
  } else {
    console.log(formFieldOptions);
    return (
      <TextField
        name={name}
        label={formFieldOptions.label}
        placeholder={formFieldOptions.placeholder}
        autoComplete={formFieldOptions.autocomplete}
        isRequired={formFieldOptions.isRequired}
        labelHidden={formFieldOptions.labelHidden}
      />
    );
  }
}
