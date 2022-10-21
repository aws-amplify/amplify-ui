import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.ConfirmVerifyUser', module)
  .add('default', () => <Authenticator.ConfirmVerifyUser {...props} />)
  .add('header', () => <Authenticator.ConfirmVerifyUser.Header />)
  .add('footer', () => <Authenticator.ConfirmVerifyUser.Footer />)
  .add('formFields', () => (
    <Authenticator.ConfirmVerifyUser.FormFields {...props} />
  ));
