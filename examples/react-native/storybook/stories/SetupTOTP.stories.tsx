import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SetupTOTP } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults';

const props = {} as any;

storiesOf('SetupTOTP', module)
  .add('default', () => <SetupTOTP {...props} />)
  .add('header', () => <SetupTOTP.Header />)
  .add('footer', () => <SetupTOTP.Footer />)
  .add('formFields', () => <SetupTOTP.FormFields fields={[]} />);
