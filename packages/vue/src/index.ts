import {
  SignIn,
  SignUp,
  FederatedSignIn,
  Authenticator,
  RenderInfo,
  SignUpPasswordControl,
  SignInPasswordControl,
  UserNameAlias,
  ForceNewPassword,
  ResetPassword,
  ConfirmResetPassword,
  ConfirmSignUp,
  ConfirmSignIn,
} from './components/index';

import './styles.css';

const install = (app) => {
  app.component('SignIn', SignIn);
  app.component('SignUp', SignUp);
  app.component('FederatedSignIn', FederatedSignIn);
  app.component('Authenticator', Authenticator);
  app.component('RenderInfo', RenderInfo);
  app.component('SignInPasswordControl', SignInPasswordControl);
  app.component('SignUpPasswordControl', SignUpPasswordControl);
  app.component('UserNameAlias', UserNameAlias);
  app.component('ForceNewPassword', ForceNewPassword);
  app.component('ResetPassword', ResetPassword);
  app.component('ConfirmResetPassword', ConfirmResetPassword);
  app.component('ConfirmSignUp', ConfirmSignUp);
  app.component('ConfirmSignIn', ConfirmSignIn);
};

Authenticator.install = install;

export {
  SignIn,
  SignUp,
  FederatedSignIn,
  Authenticator,
  RenderInfo,
  SignUpPasswordControl,
  UserNameAlias,
  ForceNewPassword,
  ResetPassword,
  ConfirmResetPassword,
  ConfirmSignUp,
  ConfirmSignIn,
};

export { useAuth } from './composables';
