/**
 * SignUp.tsx
 */

import React from 'react';

import { useForm } from 'react-hook-form';
import { SignUpProps } from '@aws-amplify/ui-react-native';

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

export function SignUp({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  socialProviders,
  toFederatedSignIn,
  toSignIn,
}: SignUpProps): React.JSX.Element {
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  return (
    <ViewContainer>
      <ViewHeader>Sign Up</ViewHeader>

      <ViewSection>
        {socialProviders?.map((name) => {
          const provider = capitalize(name);
          return (
            <ProviderButton
              icon={name}
              key={provider}
              onPress={() => toFederatedSignIn({ provider })}
            >
              Sign up with {provider}
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
        <LinkButton onPress={toSignIn}>Back To Sign In</LinkButton>
      </LinksContainer>
    </ViewContainer>
  );
}
