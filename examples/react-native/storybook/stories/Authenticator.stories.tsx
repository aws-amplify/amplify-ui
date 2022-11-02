import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AuthChallengeName, CodeDeliveryDetails } from '@aws-amplify/ui';
import { GetTotpSecretCode } from '@aws-amplify/ui-react-core/dist/types/Authenticator/hooks';
import { Authenticator } from '@aws-amplify/ui-react-native';
import noop from 'lodash/noop';
import { getComponentSlots } from '../utils';

const sharedProps = {
  error: null as unknown as string,
  handleBlur: noop,
  handleChange: noop,
  handleSubmit: (values: any) => {
    console.log('Values', values);
  },
  isPending: false,
};

const code = {
  name: 'code',
  label: 'Code',
  placeholder: 'Code',
  type: 'default' as const,
};

const password = {
  name: 'password',
  label: 'Password',
  placeholder: 'Password',
  type: 'password' as const,
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

const username = {
  name: 'username',
  label: 'Username',
  placeholder: 'Username',
  type: 'default' as const,
};

const phone = {
  name: 'phone',
  label: 'Phone',
  placeholder: 'Phone',
  type: 'phone' as const,
};

const confirmResetPasswordProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.ConfirmResetPassword),
  fields: [code, newPassword, confirmPassword],
  resendCode: noop,
};

const confirmSignInProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.ConfirmSignIn),
  fields: [code],
  challengeName: 'SMS_MFA' as AuthChallengeName,
  toSignIn: noop,
};

const confirmSignUpProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.ConfirmSignUp),
  fields: [code],
  codeDeliveryDetails: {
    AttributeName: 'email',
    DeliveryMedium: 'EMAIL',
    Destination: 'a***@e***.com',
  } as CodeDeliveryDetails,
  resendCode: noop,
};

const confirmVerifyUserProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.ConfirmResetPassword),
  fields: [username],
  skipVerification: noop,
};

const forceNewPasswordProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.ForceNewPassword),
  fields: [newPassword, confirmPassword],
  toSignIn: noop,
};

const resetPasswordProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.ResetPassword),
  fields: [username],
  toSignIn: noop,
};

const setupTOTPProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.SetupTOTP),
  fields: [code],
  getTotpSecretCode: noop as GetTotpSecretCode,
  toSignIn: noop,
};

const signInProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.SignIn),
  fields: [username, password],
  toFederatedSignIn: noop,
  toResetPassword: noop,
  toSignUp: noop,
};

const signUpProps = {
  ...sharedProps,
  ...getComponentSlots(Authenticator.SignUp),
  fields: [username, password, confirmPassword, phone],
  toFederatedSignIn: noop,
  toSignIn: noop,
};

// const verifyUserProps = {
//   ...sharedProps,
//   ...getComponentSlots(Authenticator.SignUp),
//   fields: [username, password, confirmPassword, phone],
// };

// maybe use the .addons feature to add different props?
// e.g., to change the input field from text to phone number

storiesOf('Authenticator', module)
  .add('ConfirmResetPassword', () => (
    <Authenticator.ConfirmResetPassword {...confirmResetPasswordProps} />
  ))
  .add('ConfirmSignIn', () => (
    <Authenticator.ConfirmSignIn {...confirmSignInProps} />
  ))
  .add('ConfirmSignUp', () => (
    <Authenticator.ConfirmSignUp {...confirmSignUpProps} />
  ))
  .add('ConfirmVerifyUser', () => (
    <Authenticator.ConfirmVerifyUser {...confirmVerifyUserProps} />
  ))
  .add('ForceNewPassword', () => (
    <Authenticator.ForceNewPassword {...forceNewPasswordProps} />
  ))
  .add('ResetPassword', () => (
    <Authenticator.ResetPassword {...resetPasswordProps} />
  ))
  .add('SetupTOTP', () => <Authenticator.SetupTOTP {...setupTOTPProps} />)
  .add('SignIn', () => <Authenticator.SignIn {...signInProps} />)
  .add('SignUp', () => <Authenticator.SignUp {...signUpProps} />);
// .add('VerifyUser', () => <Authenticator.VerifyUser {...props} />);
