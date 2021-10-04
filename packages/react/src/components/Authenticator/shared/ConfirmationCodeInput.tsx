import { I18n } from 'aws-amplify';

import { useAmplify } from '../../../hooks';

export interface ConfirmationCodeInputProps {
  amplifyNamespace: string;
  errorText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const ConfirmationCodeInput = (
  props: ConfirmationCodeInputProps
): JSX.Element => {
  const {
    amplifyNamespace,
    errorText,
    label = I18n.get('Code *'),
    placeholder = I18n.get('Code'),
    required = true,
  } = props;
  const {
    components: { TextField },
  } = useAmplify(amplifyNamespace);

  return (
    <TextField
      name="confirmation_code"
      label={label}
      labelHidden={true}
      placeholder={placeholder}
      required={required}
      autoComplete="one-time-code"
      errorMessage={errorText}
      hasError={!!errorText}
    />
  );
};
