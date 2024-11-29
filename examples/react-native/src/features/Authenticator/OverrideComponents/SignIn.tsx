import React from 'react';
import { Pressable, PressableProps, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { SignInProps } from '@aws-amplify/ui-react-native';

interface ButtonProps extends PressableProps {}
function Button({ children, ...props }: ButtonProps) {
  return <Pressable {...props}>{children}</Pressable>;
}

export default function SignIn({
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  hideSignUp,
  socialProviders,
  toFederatedSignIn,
  toForgotPassword,
  toSignUp,
  validationErrors,
  isPending,
  hasValidationErrors,
  error,
}: SignInProps): React.JSX.Element {
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });
  // eslint-disable-next-line no-console
  console.log('errors', errors);

  //   handleSignIn({ formValues, username }) {
  //     const { password } = formValues;
  //     return services.handleSignIn({ username, password });
  //   },

  return (
    <View>
      <View>
        {fields.map((field) => {
          const label = `${field.name[0].toLocaleUpperCase()}${field.name.slice(1)}`;
          const validationError = errors?.[field.name]?.message;

          return (
            <>
              <Text>{`${field.name[0].toLocaleUpperCase()}${field.name.slice(1)}`}</Text>
              <Controller
                control={control}
                name={field.name}
                key={field.name}
                render={({ field: { onChange, ...other } }) => (
                  <TextInput {...field} {...other} onChangeText={onChange} />
                )}
                rules={{ required: `${label} is required` }}
              />
              {typeof validationError === 'string' ? (
                <Text>{validationError}</Text>
              ) : null}
            </>
          );
        })}
      </View>
      <Button
        disabled={!isValid}
        onPress={() => {
          handleSubmit(getValues());
        }}
      >
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
