import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ConfirmSignIn } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('ConfirmSignIn', module)
  .add('default', () => <ConfirmSignIn {...props} />)
  .add('header', () => <ConfirmSignIn.Header />)
  .add('footer', () => <ConfirmSignIn.Footer />)
  .add('formFields', () => <ConfirmSignIn.FormFields fields={[]} />);
