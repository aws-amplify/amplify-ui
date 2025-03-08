/**
 * ConfirmSignUp.tsx
 */

import React from 'react';

import { useForm } from 'react-hook-form';
import { ConfirmSignUpProps } from '@aws-amplify/ui-react-native';

import {
  ErrorMessage,
  LinkButton,
  LinksContainer,
  SubmitButton,
  TextField,
  ViewHeader,
  ViewContainer,
  ViewSection,
} from './components';

export function ConfirmSignUp({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  resendCode,
}: ConfirmSignUpProps): React.JSX.Element {
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  return (
    <ViewContainer>
      <ViewHeader>Confirm Sign Up</ViewHeader>

      <ViewSection>
        {fields.map(({ name, label, ...field }) => (
          <TextField
            {...field}
            control={control}
            error={errors?.[name]?.message as string}
            key={name}
            label={label}
            name={name}
            rules={{ required: `${label} is required` }}
          />
        ))}
      </ViewSection>

      <SubmitButton
        disabled={!isValid}
        loading={isPending}
        onPress={() => {
          handleSubmit(getValues());
        }}
      >
        Submit
      </SubmitButton>

      <ErrorMessage>{errorMessage}</ErrorMessage>

      <LinksContainer>
        <LinkButton onPress={resendCode}>Resend Code</LinkButton>
      </LinksContainer>
    </ViewContainer>
  );
}
