import React from 'react';
import { storiesOf } from '@storybook/react-native';
import noop from 'lodash/noop';

import { Authenticator } from '@aws-amplify/ui-react-native';

const username = {
  name: 'username',
  label: 'Username',
  placeholder: 'Username',
  type: 'default' as const,
};

const fields = [username];

const props = {
  fields,
  Footer: Authenticator.ConfirmVerifyUser.Footer,
  FormFields: Authenticator.ConfirmVerifyUser.FormFields,
  Header: Authenticator.ConfirmVerifyUser.Header,
  isPending: false,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  error: null as unknown as string,
  skipVerification: noop,
};

storiesOf('Authenticator.ConfirmVerifyUser', module)
  .add('Default', () => <Authenticator.ConfirmVerifyUser {...props} />)
  .add('With error', () => (
    <Authenticator.ConfirmVerifyUser {...props} error={'Error!'} />
  ));
