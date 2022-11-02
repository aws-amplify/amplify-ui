import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AuthChallengeName, CodeDeliveryDetails } from '@aws-amplify/ui';
import { GetTotpSecretCode } from '@aws-amplify/ui-react-core/dist/types/Authenticator/hooks';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const newPassword = {
  name: 'newPassword',
  label: 'New Password',
  placeholder: 'New Password',
  type: 'password' as const,
};

const confirmPassword = {
  name: 'confirmPassword',
  label: 'Confirm Password',
  placeholder: 'Confirm Password',
  type: 'password' as const,
};

const fields = [code, newPassword, confirmPassword];

const codeDeliveryDetails: CodeDeliveryDetails = {
  AttributeName: 'email',
  DeliveryMedium: 'EMAIL',
  Destination: 'a***@e***.com',
};

const props = {
  error: null as unknown as string,

  // the fields need to change for each screen
  fields,

  // these components need to change for each screen as well
  Footer: Authenticator.ConfirmResetPassword.Footer,
  FormFields: Authenticator.ConfirmResetPassword.FormFields,
  Header: Authenticator.ConfirmResetPassword.Header,

  handleBlur: noop,
  handleChange: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  isPending: false,

  // ConfirmResetPassword
  resendCode: noop,

  // ConfirmSignIn
  challengeName: 'SMS_MFA' as AuthChallengeName,
  toSignIn: noop,

  // ConfirmSignUp
  codeDeliveryDetails,

  // ConfirmVerifyUser
  skipVerification: noop,

  // SetupTOTP
  getTotpSecretCode: noop as GetTotpSecretCode,

  // SignIn
  toFederatedSignIn: noop,
  toResetPassword: noop,
  toSignUp: noop,
};

storiesOf('Authenticator', module)
  .add('ConfirmResetPassword', () => (
    <Authenticator.ConfirmResetPassword {...props} />
  ))
  .add('ConfirmSignIn', () => <Authenticator.ConfirmSignIn {...props} />)
  .add('ConfirmSignUp', () => <Authenticator.ConfirmSignUp {...props} />)
  .add('ConfirmVerifyUser', () => (
    <Authenticator.ConfirmVerifyUser {...props} />
  ))
  .add('ForceNewPassword', () => <Authenticator.ForceNewPassword {...props} />)
  .add('ResetPassword', () => <Authenticator.ResetPassword {...props} />)
  .add('SetupTOTP', () => <Authenticator.SetupTOTP {...props} />)
  .add('SignIn', () => <Authenticator.SignIn {...props} />)
  .add('SignUp', () => <Authenticator.SignUp {...props} />);
// .add('VerifyUser', () => <Authenticator.VerifyUser {...props} />);
