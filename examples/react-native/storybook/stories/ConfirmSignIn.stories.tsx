import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AuthChallengeName } from '@aws-amplify/ui';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const fields = [code];

const baseProps = {
  challengeName: 'SMS_MFA' as AuthChallengeName,
  error: null as unknown as string,
  fields,
  Footer: Authenticator.ConfirmSignIn.Footer,
  FormFields: Authenticator.ConfirmSignIn.FormFields,
  Header: Authenticator.ConfirmSignIn.Header,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  isPending: false,
  toSignIn: noop,
};

storiesOf('Authenticator.ConfirmSignIn', module)
  .add('default', () => <Authenticator.ConfirmSignIn {...baseProps} />)
  .add('with error', () => (
    <Authenticator.ConfirmSignIn {...baseProps} error="Error!" />
  ))
  .add('isPending', () => (
    <Authenticator.ConfirmSignIn {...baseProps} isPending />
  ));
