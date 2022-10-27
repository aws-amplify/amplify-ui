import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { GetTotpSecretCode } from '@aws-amplify/ui-react-core/dist/types/Authenticator/hooks';
import noop from 'lodash/noop';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const fields = [code];

const props = {
  totpIssuer: 'AWS_COGNITO???',
  totpUsername: 'hello',
  getTotpSecretCode: noop as GetTotpSecretCode,
  error: null as unknown as string,
  fields,
  Footer: Authenticator.SetupTOTP.Footer,
  FormFields: Authenticator.SetupTOTP.FormFields,
  Header: Authenticator.SetupTOTP.Header,
  handleBlur: noop,
  handleChange: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  isPending: false,
};

storiesOf('Authenticator.SetupTOTP', module)
  .add('default', () => <Authenticator.SetupTOTP {...props} />)
  .add('with error', () => (
    <Authenticator.SetupTOTP {...props} error="Error!" />
  ))
  .add('isPending', () => <Authenticator.SetupTOTP {...props} isPending />);
