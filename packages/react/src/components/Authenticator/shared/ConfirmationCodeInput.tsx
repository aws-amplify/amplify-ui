import { I18n } from '@aws-amplify/core';

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
    components: { Input, Text },
  } = useAmplify(amplifyNamespace);

  const errorTextComponent = errorText ? (
    <Text data-amplify-confirmation-code-error-text variant="error">
      {errorText}
    </Text>
  ) : null;

  return (
    <>
      <Text>{label}</Text>
      <Input
        autoComplete="one-time-code"
        name="confirmation_code"
        placeholder={placeholder}
        required={required}
        type="text"
      />
      {errorTextComponent}
    </>
  );
};
