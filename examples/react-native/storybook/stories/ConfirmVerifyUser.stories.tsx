import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ConfirmVerifyUser } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('ConfirmVerifyUser', module)
  .add('default', () => <ConfirmVerifyUser {...props} />)
  .add('header', () => <ConfirmVerifyUser.Header />)
  .add('footer', () => <ConfirmVerifyUser.Footer />)
  .add('formFields', () => <ConfirmVerifyUser.FormFields {...props} />);
