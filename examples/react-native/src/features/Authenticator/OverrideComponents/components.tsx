/**
 * components.tsx
 */

import React from 'react';

import { Controller, ControllerProps } from 'react-hook-form';
import { View, ViewProps, ViewStyle } from 'react-native';
import {
  Button,
  ButtonProps,
  Headline,
  HeadlineProps,
  HelperText,
  Text,
  TextProps,
  TextInput,
  TextInputProps,
  useTheme,
  Divider,
} from 'react-native-paper';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

const styles = {
  signOutButton: { marginVertical: 32, marginHorizontal: 16 },
  viewHeader: { marginBottom: 16 },
  viewDivider: { marginVertical: 16 },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  } as ViewStyle,
  errorMessage: { marginTop: 16, padding: 16 },
};

export interface TextFieldProps
  extends Omit<TextInputProps, 'error' | 'cursorColor' | 'selectionColor'>,
    Pick<ControllerProps, 'control' | 'name' | 'rules'> {
  control: ControllerProps['control'];
  error?: string;
  type?: 'email' | 'default' | 'password' | 'phone';
}

export function TextField({
  control,
  error,
  name,
  type = 'default',
  rules,
  secureTextEntry,
  ...props
}: TextFieldProps) {
  return (
    <React.Fragment key={name}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange: onChangeText, ...renderProps } }) => (
          <TextInput
            {...(props as TextInputProps)}
            {...renderProps}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry ?? type === 'password'}
          />
        )}
        rules={rules}
      />
      <HelperText type="error" visible={!!error}>
        {error || ' '}
      </HelperText>
    </React.Fragment>
  );
}

export function SubmitButton({
  children,
  disabled,
  style,
  loading,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Button
      {...props}
      disabled={disabled}
      loading={loading}
      style={[
        {
          backgroundColor:
            disabled || loading
              ? theme.colors.surfaceDisabled
              : theme.colors.primary,
        },

        style,
      ]}
      textColor={theme.colors.inverseOnSurface}
    >
      {children}
    </Button>
  );
}

export function ProviderButton({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} mode="outlined">
      {children}
    </Button>
  );
}

export function ViewHeader({ children, style, ...props }: HeadlineProps) {
  return (
    <Headline {...props} style={[styles.viewHeader, style]}>
      {children}
    </Headline>
  );
}

export function ViewSection({ children, ...props }: ViewProps) {
  return <View {...props}>{children}</View>;
}

export function LinksContainer({ children, style, ...props }: ViewProps) {
  return (
    <View {...props} style={[styles.linksContainer, style]}>
      {children}
    </View>
  );
}

export function LinkButton(props: ButtonProps) {
  return <Button {...props} />;
}

export function ErrorMessage({ children, style, ...props }: TextProps<string>) {
  const theme = useTheme();

  if (!children) return null;

  return (
    <Text
      {...props}
      style={[
        {
          backgroundColor: theme.colors.errorContainer,
          borderRadius: theme.roundness,
        },
        styles.errorMessage,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function ViewContainer({ children, style, ...props }: ViewProps) {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[{ backgroundColor: theme.colors.background }, style]}
    >
      {children}
    </View>
  );
}

export function ViewDivider() {
  return <Divider style={styles.viewDivider} />;
}

export function SignOutButton() {
  const { signOut } = useAuthenticator();
  return (
    <Button onPress={signOut} style={styles.signOutButton}>
      Sign Out
    </Button>
  );
}

export function Container({
  style,
  ...props
}: React.ComponentProps<typeof Authenticator.Container>) {
  const theme = useTheme();
  return (
    <Authenticator.Container
      {...props}
      style={[{ backgroundColor: theme.colors.background }, style]}
    />
  );
}
