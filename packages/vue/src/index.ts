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
  ConfirmVerifyUser,
  VerifyUser,
} from './components/index';

import './styles.css';

export default {
  install: (app) => {
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
    app.component('VerifyUser', VerifyUser);
    app.component('ConfirmVerifyUser', ConfirmVerifyUser);
  },
};

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
  ConfirmVerifyUser,
  VerifyUser,
};

export { useAuth } from './composables';
