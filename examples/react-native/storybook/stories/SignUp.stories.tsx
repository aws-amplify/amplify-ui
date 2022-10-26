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
const password = {
  name: 'password',
  label: 'Password',
  placeholder: 'Password',
  type: 'password' as const,
};
const confirmPassword = {
  name: 'confirmPassword',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  type: 'password' as const,
};
const phone = {
  name: 'phone',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  type: 'phone' as const,
};

const fields = [username, password, confirmPassword, phone];

const props = {
  fields,
  Footer: Authenticator.SignUp.Footer,
  FormFields: Authenticator.SignUp.FormFields,
  Header: Authenticator.SignUp.Header,
  hideSignIn: false,
  isPending: false,
  handleBlur: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  handleChange: noop,
  toFederatedSignIn: noop,
  toSignIn: noop,
  error: null as unknown as string,
};

storiesOf('SignUp', module)
  .add('default', () => <Authenticator.SignUp {...props} />)
  .add('with error', () => <Authenticator.SignUp {...props} error={'Error!'} />)
  .add('with Social Providers', () => (
    <Authenticator.SignUp
      {...props}
      socialProviders={['amazon', 'apple', 'facebook', 'google']}
    />
  ));
