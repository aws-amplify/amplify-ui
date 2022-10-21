import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.ConfirmResetPassword', module)
  .add('default', () => <Authenticator.ConfirmResetPassword {...props} />)
  .add('header', () => <Authenticator.ConfirmResetPassword.Header />)
  .add('footer', () => <Authenticator.ConfirmResetPassword.Footer />)
  .add('formFields', () => (
    <Authenticator.ConfirmResetPassword.FormFields {...props} />
  ));
