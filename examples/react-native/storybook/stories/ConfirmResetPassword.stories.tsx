import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ConfirmResetPassword } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('ConfirmResetPassword', module)
  .add('default', () => <ConfirmResetPassword {...props} />)
  .add('header', () => <ConfirmResetPassword.Header />)
  .add('footer', () => <ConfirmResetPassword.Footer />)
  .add('formFields', () => <ConfirmResetPassword.FormFields {...props} />);
