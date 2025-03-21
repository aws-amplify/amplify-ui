/**
 * SignIn.tsx
 */

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
  ViewSection,
  ViewDivider,
} from './components';

function capitalize<T extends string>([first, ...rest]: T): Capitalize<T> {
  return [first && first.toUpperCase(), rest.join('').toLowerCase()]
    .filter(Boolean)
    .join('') as Capitalize<T>;
}

export function SignIn({
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

      <ViewSection>
        {socialProviders?.map((name) => {
          const provider = capitalize(name);
          return (
            <ProviderButton
              icon={name}
              key={provider}
              onPress={() => toFederatedSignIn({ provider })}
            >
              Sign in with {provider}
            </ProviderButton>
          );
        }) ?? null}
      </ViewSection>

      <ViewDivider />

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
        <LinkButton onPress={toSignUp}>Sign Up</LinkButton>
        <LinkButton onPress={toForgotPassword}>Forgot Password?</LinkButton>
      </LinksContainer>
    </ViewContainer>
  );
}
