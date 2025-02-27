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
} from 'react-native-paper';

const styles = {
  providerButton: { marginBottom: 16 },
  viewHeader: { marginBottom: 16 },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  } as ViewStyle,
  errorMessage: { marginTop: 16, padding: 16 },
};

export function capitalize<T extends string>(value: T): Capitalize<T> {
  return (
    value.length ? value.charAt(0).toUpperCase() + value.slice(1) : ''
  ) as Capitalize<T>;
}

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
        {error}
      </HelperText>
    </React.Fragment>
  );
}

export function SubmitButton({
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Button
      {...props}
      disabled={disabled}
      style={[
        {
          backgroundColor: disabled
            ? theme.colors.surfaceDisabled
            : theme.colors.primaryContainer,
        },
        style,
      ]}
    >
      {children}
    </Button>
  );
}

export function ProviderButton({ children, style, ...props }: ButtonProps) {
  return (
    <Button {...props} mode="outlined" style={[styles.providerButton, style]}>
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

  return !children ? null : (
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
