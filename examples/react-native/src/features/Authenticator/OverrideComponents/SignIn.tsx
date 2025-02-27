import React from 'react';

import { useForm } from 'react-hook-form';
import { SignInProps } from '@aws-amplify/ui-react-native';

import {
  ErrorMessage,
  LinkButton,
  LinksContainer,
  ProviderButton,
  SubmitButton,
  TextField,
  ViewHeader,
  ViewContainer,
} from './components';

function capitalize<T extends string>(value: T): Capitalize<T> {
  return (
    value.length ? value.charAt(0).toUpperCase() + value.slice(1) : ''
  ) as Capitalize<T>;
}

export default function SignIn({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  socialProviders,
  toFederatedSignIn,
  toForgotPassword,
  toSignUp,
}: SignInProps): React.JSX.Element {
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  return (
    <ViewContainer>
      <ViewHeader>Sign In</ViewHeader>
      {socialProviders?.map((name) => {
        const provider = capitalize(name);
        return (
          <ProviderButton
            key={provider}
            onPress={() => toFederatedSignIn({ provider })}
          >
            Sign in with {provider}
          </ProviderButton>
        );
      }) ?? null}

      {fields.map(({ name, label, ...field }) => (
        <TextField
          {...field}
          name={name}
          control={control}
          error={errors?.[name]?.message as string}
          label={label}
          rules={{ required: `${label} is required` }}
        />
      ))}

      <SubmitButton
        disabled={!isValid}
        loading={isPending}
        onPress={() => {
          handleSubmit(getValues());
        }}
      >
        Submit
      </SubmitButton>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      <LinksContainer>
        <LinkButton onPress={toSignUp}>Create Account</LinkButton>
        <LinkButton onPress={toForgotPassword}>Forgot Password?</LinkButton>
      </LinksContainer>
    </ViewContainer>
  );
}
