import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const newPassword = {
  name: 'newPassword',
  label: 'New Password',
  placeholder: 'New Password',
  type: 'password' as const,
};

const confirmPassword = {
  name: 'confirmPassword',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  type: 'password' as const,
};

const fields = [code, newPassword, confirmPassword];

const props = {
  error: null as unknown as string,
  fields,
  Footer: Authenticator.ConfirmResetPassword.Footer,
  FormFields: Authenticator.ConfirmResetPassword.FormFields,
  Header: Authenticator.ConfirmResetPassword.Header,
  handleBlur: noop,
  handleChange: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  isPending: false,
  resendCode: () => {},
};

storiesOf('Authenticator.ConfirmResetPassword', module)
  .add('default', () => <Authenticator.ConfirmResetPassword {...props} />)
  .add('with error', () => (
    <Authenticator.ConfirmResetPassword {...props} error="Error!" />
  ))
  .add('isPending', () => (
    <Authenticator.ConfirmResetPassword {...props} isPending />
  ));
