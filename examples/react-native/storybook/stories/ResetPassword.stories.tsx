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

const fields = [username];

const baseProps = {
  error: null as unknown as string,
  fields,
  Footer: Authenticator.ResetPassword.Footer,
  FormFields: Authenticator.ResetPassword.FormFields,
  Header: Authenticator.ResetPassword.Header,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  isPending: false,
  toSignIn: noop,
};

storiesOf('Authenticator.ResetPassword', module)
  .add('default', () => <Authenticator.ResetPassword {...baseProps} />)
  .add('with error', () => (
    <Authenticator.ResetPassword {...baseProps} error="Error!" />
  ))
  .add('isPending', () => (
    <Authenticator.ResetPassword {...baseProps} isPending />
  ));
