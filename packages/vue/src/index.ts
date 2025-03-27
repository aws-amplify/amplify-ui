import type { App } from 'vue';

import {
  AmplifyButton,
  AmplifyCheckBox,
  AmplifyTextField,
  Authenticator,
  AuthenticatorForceNewPasswordFormFields,
  AuthenticatorSignUpFormFields,
  BaseFormField,
  BaseFormFields,
  ConfirmResetPassword,
  ConfirmSignIn,
  ConfirmSignUp,
  ConfirmVerifyUser,
  FederatedSignIn,
  ForceNewPassword,
  PasswordControl,
  RenderInfo,
  ForgotPassword,
  SignIn,
  SignUp,
  VerifyUser,
} from './components/index';

// Import all base primitive components
import BaseInput from './components/primitives/base-input.vue';
import BaseLabel from './components/primitives/base-label.vue';
import BaseSelect from './components/primitives/base-select.vue';
import BaseWrapper from './components/primitives/base-wrapper.vue';
import BaseAlert from './components/primitives/base-alert.vue';
import BaseBox from './components/primitives/base-box.vue';
import BaseFieldSet from './components/primitives/base-field-set.vue';
import BaseFooter from './components/primitives/base-footer.vue';
import BaseForm from './components/primitives/base-form.vue';
import BaseHeading from './components/primitives/base-heading.vue';
import BaseSpacer from './components/primitives/base-spacer.vue';
import BaseText from './components/primitives/base-text.vue';
import BaseTwoTabs from './components/primitives/base-two-tabs.vue';
import BaseTwoTabItem from './components/primitives/base-two-tab-item.vue';

import { useAuthenticator } from './composables/useAuth';

import './styles.css';

export default {
  install: (app: App) => {
    // Register main components
    app.component('SignIn', SignIn);
    app.component('SignUp', SignUp);
    app.component('FederatedSignIn', FederatedSignIn);
    app.component('Authenticator', Authenticator);
    app.component('RenderInfo', RenderInfo);
    app.component('PasswordControl', PasswordControl);
    app.component('ForceNewPassword', ForceNewPassword);
    app.component('ForgotPassword', ForgotPassword);
    app.component('ConfirmResetPassword', ConfirmResetPassword);
    app.component('ConfirmSignUp', ConfirmSignUp);
    app.component('ConfirmSignIn', ConfirmSignIn);
    app.component('VerifyUser', VerifyUser);
    app.component('ConfirmVerifyUser', ConfirmVerifyUser);
    app.component('AmplifyTextField', AmplifyTextField);
    app.component('AmplifyCheckBox', AmplifyCheckBox);
    app.component('AmplifyButton', AmplifyButton);
    app.component('BaseFormField', BaseFormField);
    app.component('BaseFormFields', BaseFormFields);
    app.component(
      'AuthenticatorSignUpFormFields',
      AuthenticatorSignUpFormFields
    );
    app.component(
      'AuthenticatorForceNewPasswordFormFields',
      AuthenticatorForceNewPasswordFormFields
    );

    // Register all base primitive components with both PascalCase and kebab-case names
    // PascalCase for code references
    app.component('BaseInput', BaseInput);
    app.component('BaseLabel', BaseLabel);
    app.component('BaseSelect', BaseSelect);
    app.component('BaseWrapper', BaseWrapper);
    app.component('BaseAlert', BaseAlert);
    app.component('BaseBox', BaseBox);
    app.component('BaseFieldSet', BaseFieldSet);
    app.component('BaseFooter', BaseFooter);
    app.component('BaseForm', BaseForm);
    app.component('BaseHeading', BaseHeading);
    app.component('BaseSpacer', BaseSpacer);
    app.component('BaseText', BaseText);
    app.component('BaseTwoTabs', BaseTwoTabs);
    app.component('BaseTwoTabItem', BaseTwoTabItem);

    // kebab-case for template references (required for compatibility)
    app.component('base-input', BaseInput);
    app.component('base-label', BaseLabel);
    app.component('base-select', BaseSelect);
    app.component('base-wrapper', BaseWrapper);
    app.component('base-alert', BaseAlert);
    app.component('base-box', BaseBox);
    app.component('base-field-set', BaseFieldSet);
    app.component('base-footer', BaseFooter);
    app.component('base-form', BaseForm);
    app.component('base-heading', BaseHeading);
    app.component('base-spacer', BaseSpacer);
    app.component('base-text', BaseText);
    app.component('base-two-tabs', BaseTwoTabs);
    app.component('base-two-tab-item', BaseTwoTabItem);
  },
};

export {
  SignIn,
  SignUp,
  FederatedSignIn,
  Authenticator,
  AuthenticatorSignUpFormFields,
  AuthenticatorForceNewPasswordFormFields,
  RenderInfo,
  ForceNewPassword,
  PasswordControl,
  ForgotPassword,
  ConfirmResetPassword,
  ConfirmSignUp,
  ConfirmSignIn,
  ConfirmVerifyUser,
  VerifyUser,
  AmplifyTextField,
  AmplifyCheckBox,
  AmplifyButton,
  useAuthenticator,
  // Export primitive components
  BaseInput,
  BaseLabel,
  BaseSelect,
  BaseWrapper,
  BaseAlert,
  BaseBox,
  BaseFieldSet,
  BaseFooter,
  BaseForm,
  BaseHeading,
  BaseSpacer,
  BaseText,
  BaseTwoTabs,
  BaseTwoTabItem,
};

/**
 * Re-export public APIs from `@aws-amplify/ui`
 */
export { translations } from '@aws-amplify/ui';
