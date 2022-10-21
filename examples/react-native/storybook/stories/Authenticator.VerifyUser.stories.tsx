import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Authenticator } from '@aws-amplify/ui-react-native';

const props = {} as any;

storiesOf('Authenticator.VerifyUser', module)
  .add('default', () => <Authenticator.VerifyUser {...props} />)
  .add('header', () => <Authenticator.VerifyUser.Header />)
  .add('footer', () => <Authenticator.VerifyUser.Footer />)
  .add('formFields', () => <Authenticator.VerifyUser.FormFields {...props} />);
