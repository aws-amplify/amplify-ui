import { I18n } from '@aws-amplify/core';

import { useAmplify } from '../../../hooks';

export interface PasswordInputProps {
  amplifyNamespace: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const {
    amplifyNamespace,
    label = I18n.get('Password'),
    placeholder = I18n.get('Password'),
    required = true,
  } = props;
  const {
    components: { Input, Text },
  } = useAmplify(amplifyNamespace);

  return (
    <>
      <Text>{label}</Text>
      <Input
        autoComplete="password"
        name="password"
        placeholder={placeholder}
        required={required}
        type="password"
      />
    </>
  );
};
