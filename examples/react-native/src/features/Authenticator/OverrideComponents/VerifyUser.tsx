/**
 * VerifyUser.tsx
 */

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from 'react-native-paper';
import { censorContactMethod, ContactMethod } from '@aws-amplify/ui';
import { VerifyUserProps } from '@aws-amplify/ui-react-native';

import {
  ErrorMessage,
  LinkButton,
  LinksContainer,
  SubmitButton,
  ViewHeader,
  ViewContainer,
  ViewSection,
} from './components';

interface AttributeMap {
  email: ContactMethod;
  phone_number: ContactMethod;
}

const attributeMap: AttributeMap = {
  email: 'Email',
  phone_number: 'Phone Number',
};

export function VerifyUser({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  skipVerification,
}: VerifyUserProps): React.JSX.Element {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  return (
    <ViewContainer>
      <ViewHeader>Verify User</ViewHeader>

      <ViewSection>
        <Controller
          control={control}
          name="unverifiedAttr"
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {fields.map((field) => {
                const attributeType =
                  attributeMap[field.name as keyof AttributeMap];
                return (
                  <RadioButton.Item
                    key={field.value}
                    label={censorContactMethod(attributeType, field.value)}
                    value={field.name}
                  />
                );
              })}
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
        <LinkButton onPress={skipVerification}>Skip</LinkButton>
      </LinksContainer>
    </ViewContainer>
  );
}
