import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import noop from 'lodash/noop';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { SignUpBaseProps } from '@aws-amplify/ui-react-core/dist/types/Authenticator/hooks';

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
  .add('with error', () => (
    <Authenticator.SignUp {...props} error={'Error!'} />
  ));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
