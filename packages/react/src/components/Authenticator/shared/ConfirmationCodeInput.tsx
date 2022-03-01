import { translate } from '@aws-amplify/ui';

import { TextField } from '../../../primitives';

export interface ConfirmationCodeInputProps {
  errorText?: string;
  labelHidden?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export const ConfirmationCodeInput = (
  props: ConfirmationCodeInputProps
): JSX.Element => {
  const {
    errorText,
    labelHidden = true,
    label = `${translate('Code')} *`,
    placeholder = translate('Code'),
    required = true,
    type = 'text',
  } = props;
  // TODO: enforce type="number" on all confirmation codes

  return (
    <TextField
      name="confirmation_code"
      label={label}
      labelHidden={labelHidden}
      placeholder={placeholder}
      required={required}
      autoComplete="one-time-code"
      errorMessage={errorText}
      hasError={!!errorText}
      type={type}
    />
  );
};
