/**
 * SelectMfaType.tsx
 */

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { SelectMfaTypeProps } from '@aws-amplify/ui-react-native';

import {
  ErrorMessage,
  LinkButton,
  LinksContainer,
  SubmitButton,
  ViewHeader,
  ViewContainer,
  ViewSection,
} from './components';
import { RadioButton } from 'react-native-paper';

export function SelectMfaType({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  toSignIn,
}: SelectMfaTypeProps): React.JSX.Element {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  return (
    <ViewContainer>
      <ViewHeader>Select MFA Type</ViewHeader>

      <ViewSection>
        <Controller
          control={control}
          name="mfa_type"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {fields.map((field) => (
                <RadioButton.Item
                  key={field.value}
                  label={field.label!}
                  value={field.value!}
                />
              ))}
            </RadioButton.Group>
          )}
        />
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
