/**
 * SetupTotp.tsx
 */

import React from 'react';

import { useForm } from 'react-hook-form';
import { SetupTotpProps } from '@aws-amplify/ui-react-native';

import {
  ErrorMessage,
  LinkButton,
  LinksContainer,
  SubmitButton,
  TextField,
  ViewHeader,
  ViewContainer,
  ViewSection,
  ViewDivider,
} from './components';
import { Text } from 'react-native-paper';

export function SetupTotp({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  toSignIn,
  totpSecretCode,
}: SetupTotpProps): React.JSX.Element {
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  return (
    <ViewContainer>
      <ViewHeader>Setup TOTP</ViewHeader>

      <ViewSection>
        <Text variant="bodyLarge">
          Copy and paste the secret key below into an authenticator app and then
          enter the code in the text field below.
        </Text>
        <ViewDivider />
        <Text selectable variant="bodyLarge">
          {totpSecretCode}
        </Text>
      </ViewSection>

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
