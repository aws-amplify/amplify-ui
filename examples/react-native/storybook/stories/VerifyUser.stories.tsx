import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { VerifyUser } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('VerifyUser', module)
  .add('default', () => <VerifyUser {...props} />)
  .add('header', () => <VerifyUser.Header />)
  .add('footer', () => <VerifyUser.Footer />)
  .add('formFields', () => <VerifyUser.FormFields {...props} />);
