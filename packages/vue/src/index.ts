import { App, Plugin } from 'vue';
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

import { applyPolyfills } from '@aws-amplify/ui-components/loader';

// import { defineCustomElements } from '@aws-amplify/ui-components/dist/components/index';
import {
  AmplifyChatbot,
  AmplifyButton,
  AmplifyInput,
  AmplifyToast,
} from '@aws-amplify/ui-components/dist/components';

applyPolyfills().then(() => {
  // defineCustomElements(window);
  customElements.define('amplify-button', AmplifyButton);
  customElements.define('amplify-input', AmplifyInput);
  customElements.define('amplify-toast', AmplifyToast);
  customElements.define('amplify-chatbot', AmplifyChatbot);
});

const install = (app, options) => {
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
