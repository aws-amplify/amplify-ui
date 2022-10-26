import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';

const baseProps = {
  error: null as unknown as string,
  fields: [],
  Footer: Authenticator.ForceNewPassword.Footer,
  FormFields: Authenticator.ForceNewPassword.FormFields,
  Header: Authenticator.ForceNewPassword.Header,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  isPending: false,
  toSignIn: noop,
};

storiesOf('Authenticator.ForceNewPassword', module)
  .add('default', () => <Authenticator.ForceNewPassword {...baseProps} />)
  .add('with error', () => (
    <Authenticator.ForceNewPassword {...baseProps} error="Error!" />
  ))
  .add('isPending', () => (
    <Authenticator.ForceNewPassword {...baseProps} isPending />
  ));
