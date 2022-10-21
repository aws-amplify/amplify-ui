import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.ForceNewPassword', module)
  .add('default', () => <Authenticator.ForceNewPassword {...props} />)
  .add('header', () => <Authenticator.ForceNewPassword.Header />)
  .add('footer', () => <Authenticator.ForceNewPassword.Footer />)
  .add('formFields', () => (
    <Authenticator.ForceNewPassword.FormFields {...props} />
  ));
