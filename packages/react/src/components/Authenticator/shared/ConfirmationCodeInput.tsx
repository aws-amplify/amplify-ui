import { useAmplify } from "@aws-amplify/ui-react";

export interface ConfirmationCodeInputProps {
  amplifyNamespace: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const ConfirmationCodeInput = (
  props: ConfirmationCodeInputProps
): JSX.Element => {
  const {
    amplifyNamespace,
    label = "Code *",
    placeholder = "Code",
    required = true,
  } = props;
  const {
    components: { Input, Text },
  } = useAmplify(amplifyNamespace);

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
    </>
  );
};
