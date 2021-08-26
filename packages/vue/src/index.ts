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
} from './components/index';

import '../styles.css';

const install = (app) => {
  // Plugin code goes here
  app.component('SignIn', SignIn);
  app.component('SignUp', SignUp);
  app.component('FederatedSignIn', FederatedSignIn);
  app.component('Authenticator', Authenticator);
  app.component('RenderInfo', RenderInfo);
  app.component('SignInPasswordControl', SignInPasswordControl);
  app.component('SignUpPasswordControl', SignUpPasswordControl);
  app.component('UserNameAlias', UserNameAlias);
  app.component('ForceNewPassword', ForceNewPassword);
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
};
