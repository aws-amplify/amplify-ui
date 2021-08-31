import * as React from 'react';

import {
  TextField,
  Text,
  Flex,
  Button,
  View,
  Heading,
  Divider,
  FlexStyleProps,
  TextFieldProps,
  PasswordField,
  PasswordFieldProps,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { GetFieldControls } from '@/components/GetFieldControls';
import { useFlexStyleProps } from '@/components/useFlexStyleProps';
import { usePasswordFieldProps } from '@/components/usePasswordFieldProps';

export const PasswordFieldDemo = () => {
  const flexStyleProps = useFlexStyleProps({
    alignItems: '',
    alignContent: '',
    direction: 'column',
    gap: '',
    justifyContent: '',
    wrap: 'nowrap',
  });
  const textFieldProps = usePasswordFieldProps({
    autoComplete: 'new-password',
    defaultValue: '',
    descriptiveText: 'Please enter password with at least 8 characters',
    errorMessage: '',
    hasError: false,
    inputMode: 'text',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    label: 'Password',
    labelHidden: false,
    name: 'password',
    placeholder: '',
    size: '',
    type: null,
    value: undefined,
    variation: '',
    hideShowPassword: false,
  });
  const FlexPropControls = GetFieldControls({
    typeName: 'Flex',
    fields: flexStyleProps,
  });
  const TextFieldPropControls = GetFieldControls({
    typeName: 'PasswordField',
    fields: textFieldProps,
  });
  const [
    [alignItems],
    [alignContent],
    [direction],
    [gap],
    [justifyContent],
    [wrap],
  ] = flexStyleProps;
  const [
    [autoComplete],
    [defaultValue],
    [descriptiveText],
    [errorMessage],
    [hasError],
    [inputMode],
    [isDisabled],
    [isReadOnly],
    [isRequired],
    [label],
    [labelHidden],
    [name],
    [placeholder],
    [size],
    [type],
    [value],
    [variation],
    [hideShowPassword],
  ] = textFieldProps;
  return (
    <View width="100%">
      {TextFieldPropControls}
      {FlexPropControls}
      <Example>
        <View maxWidth="500px" padding="2rem">
          <Flex gap="2rem" direction="column">
            <form>
              <input
                autoComplete="username"
                name="username"
                defaultValue="me@email.com"
                type="hidden"
              />
              <PasswordField
                alignContent={alignContent as FlexStyleProps['alignContent']}
                alignItems={alignItems as FlexStyleProps['alignItems']}
                autoComplete={autoComplete as TextFieldProps['autoComplete']}
                descriptiveText={
                  descriptiveText as TextFieldProps['descriptiveText']
                }
                defaultValue={defaultValue as TextFieldProps['defaultValue']}
                direction={direction as FlexStyleProps['direction']}
                errorMessage={errorMessage as TextFieldProps['errorMessage']}
                gap={gap as FlexStyleProps['gap']}
                hasError={hasError as unknown as boolean}
                inputMode={inputMode as TextFieldProps['inputMode']}
                isDisabled={isDisabled as unknown as boolean}
                isReadOnly={isReadOnly as unknown as boolean}
                isRequired={isRequired as unknown as boolean}
                justifyContent={
                  justifyContent as FlexStyleProps['justifyContent']
                }
                label={label as TextFieldProps['label']}
                labelHidden={labelHidden as unknown as boolean}
                name={name as TextFieldProps['name']}
                placeholder={placeholder as TextFieldProps['placeholder']}
                size={size as TextFieldProps['size']}
                variation={variation as TextFieldProps['variation']}
                wrap={wrap as FlexStyleProps['wrap']}
                hideShowPassword={
                  hideShowPassword as unknown as PasswordFieldProps['hideShowPassword']
                }
              />
            </form>
          </Flex>
        </View>
      </Example>
    </View>
  );
};

export const LoginFormExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Login</Heading>
    <TextField label="Username" name="username" autoComplete="username" />
    <PasswordField
      label="Password"
      name="password"
      autoComplete="current-password"
    />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Login
    </Button>
  </Flex>
);

export const SignUpFormExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Sign Up</Heading>
    <TextField label="Username" name="username" autoComplete="username" />
    <PasswordField
      label="Password"
      name="password"
      autoComplete="new-password"
      descriptiveText="Password must be at least 8 characters"
    />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Sign Up
    </Button>
  </Flex>
);

export const ChangePasswordFormExample = () => (
  <Flex as="form" direction="column" gap="1rem">
    <Heading level={3}>Change Password</Heading>
    <TextField label="Username" name="username" autoComplete="username" />
    <PasswordField
      label="Current password"
      name="current_password"
      autoComplete="current-password"
      descriptiveText="Password must be at least 8 characters"
    />
    <PasswordField
      label="New password"
      name="new_password"
      autoComplete="new-password"
      descriptiveText="Password must be at least 8 characters"
    />
    <PasswordField
      label="Confirm password"
      name="confirm_password"
      autoComplete="new-password"
    />
    <Button type="submit" onClick={(e) => e.preventDefault()}>
      Submit
    </Button>
  </Flex>
);

export const DescriptiveTextExample = () => (
  <PasswordField
    label="Password"
    name="password"
    descriptiveText={
      <Text
        as="span"
        color="rebeccapurple"
        fontStyle="italic"
        fontSize="0.8rem"
      >
        Password length must be greater than 8 characters
      </Text>
    }
  />
);

export const RequiredPasswordFieldExample = () => (
  <Flex as="form" direction="column" width="20rem">
    <PasswordField
      label={
        <Text>
          Password
          <Text as="span" fontSize="0.8rem" color="red">
            {' '}
            (required)
          </Text>
        </Text>
      }
      name="password"
      isRequired={true}
    />
    <PasswordField
      label="Password"
      descriptiveText={
        <Text as="span" fontSize="0.8rem" color="red" fontStyle="italic">
          Required
        </Text>
      }
      name="password"
      isRequired={true}
    />
    <Button type="submit">Submit</Button>
  </Flex>
);

export const PasswordFieldStyledPropsExample = () => (
  <TextField
    direction="row"
    alignItems="baseline"
    fontSize="1.5rem"
    label={
      <Text fontWeight="bold" fontSize="1.5rem">
        Name:
      </Text>
    }
    backgroundColor="#fff1e7"
    color="#000"
    width="400px"
  />
);
