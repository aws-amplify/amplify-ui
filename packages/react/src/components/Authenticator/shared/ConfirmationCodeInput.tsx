import { I18n } from 'aws-amplify';
import { TextField } from '../../../primitives';

export interface ConfirmationCodeInputProps {
  errorText?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const ConfirmationCodeInput = (
  props: ConfirmationCodeInputProps
): JSX.Element => {
  const {
    errorText,
    label = I18n.get('Code *'),
    placeholder = I18n.get('Code'),
    required = true,
  } = props;

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
