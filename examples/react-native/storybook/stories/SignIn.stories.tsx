import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';

const username = {
  name: 'username',
  label: 'Username',
  placeholder: 'Username',
  type: 'default' as const,
};

const password = {
  name: 'password',
  label: 'Password',
  placeholder: 'Password',
  type: 'password' as const,
};

const fields = [username, password];

const baseProps = {
  fields,
  Footer: Authenticator.SignIn.Footer,
  FormFields: Authenticator.SignIn.FormFields,
  Header: Authenticator.SignIn.Header,
  hideSignUp: false,
  isPending: false,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  toFederatedSignIn: noop,
  toResetPassword: noop,
  toSignUp: noop,
  error: null as unknown as string,
};

storiesOf('Authenticator.SignIn', module)
  .add('Basic', () => <Authenticator.SignIn {...baseProps} />)
  .add('With error', () => (
    <Authenticator.SignIn {...baseProps} error={'Error!'} />
  ))
  .add('With Social Providers', () => (
    <Authenticator.SignIn
      {...baseProps}
      socialProviders={['amazon', 'facebook']}
    />
  ));
