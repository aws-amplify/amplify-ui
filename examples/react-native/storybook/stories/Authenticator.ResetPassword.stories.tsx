import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.ResetPassword', module)
  .add('default', () => <Authenticator.ResetPassword {...props} />)
  .add('header', () => <Authenticator.ResetPassword.Header />)
  .add('footer', () => <Authenticator.ResetPassword.Footer />)
  .add('formFields', () => (
    <Authenticator.ResetPassword.FormFields {...props} />
  ));
