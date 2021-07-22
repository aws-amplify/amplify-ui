import { Ref, ComputedRef } from 'vue';
import { PayloadSender, EventObject } from 'xstate';

export interface SetupEventContext {
  emit: (eventName: string, payload?: unknown) => void;
  attrs: Record<string, unknown>;
}

export interface UserNameAliasTypes {
  userName: string;
  disabled: boolean;
  userNameAlias: boolean;
}

export interface UserNameAliasSetupReturnTypes {
  label: string;
  name: string;
  type: string;
  error: string;
  uName: Ref<string>;
}

export interface SignInSetupReturnTypes {
  onSignInSubmit: (e: Event) => void;
  AUTHENTICATOR: string;
  onForgotPasswordClicked: () => void;
  onCreateAccountClicked: () => void;
  onInput: (e: Event) => void;
  username: Ref<string>;
  password: Ref<string>;
  submit: (e: Event) => void;
  state: Ref;
}

export interface SignUpSetupReturnTypes {
  onHaveAccountClicked: () => void;
  onSignUpSubmit: (e: Event) => void;
  onChange: (e: Event) => void;
  state: Ref;
  phone: Ref<string>;
  submit: () => void;
  error: Ref<string>;
  secondaryAliases: string[];
  signInButtonText: ComputedRef<string>;
  haveAccountLabel: ComputedRef<string>;
  createAccountLabel: ComputedRef<string>;
  signUpButtonText: ComputedRef<string>;
  userNameAliasNames: ComputedRef<UserNameAliasNamesTypes>;
}

export interface ConfirmPasswordSetupReturnTypes {
  onConfirmSignUpSubmit: (e: Event) => void;
  onBackToSignInClicked: () => void;
  submit: (e: Event) => void;
  confirmSignUpHeading: ComputedRef<string>;
  confirmationCodeText: ComputedRef<string>;
  lostYourCodeText: ComputedRef<string>;
  resendCodeText: ComputedRef<string>;
  backSignInText: ComputedRef<string>;
  confirmText: ComputedRef<string>;
  onLostCodeClicked: () => void;
  state: Ref;
  send: PayloadSender<EventObject>;
  primaryAlias: string;
}

export interface ConfirmSignInSetupReturnTypes {
  confirmSignInHeading: string;
  onConfirmSignInSubmit: (e: Event) => void;
  onBackToSignInClicked: () => void;
  submit: (e: Event) => void;
  backSignInText: ComputedRef<string>;
  confirmText: ComputedRef<string>;
  state: Ref;
}

export interface SignUpPhoneControlTypes {
  phoneNumberLabel: ComputedRef<string>;
  options: Array<{ value: string }>;
  phonePreFix: Ref<string>;
  phoneNumber: Ref<string>;
}

export interface AuthenticatorSetupReturnTypes {
  currentPage: Ref<string>;
  state: Ref;
  send: PayloadSender<EventObject>;
  onSignInSubmitI: (e: Event) => void;
  onSignUpSubmitI: (e: Event) => void;
  onConfirmSignUpSubmitI: (e: Event) => void;
  onConfirmSignInSubmitI: (e: Event) => void;
  onConfirmSetupTOTPSubmitI: (e: Event) => void;
}

export interface AliasControlTypes {
  userNameAliasNames: ComputedRef<UserNameAliasNamesTypes>;
}

export interface UserNameAliasNameT {
  name: string;
  type: string;
  placeholder: string;
}
export interface UserNameAliasNamesTypes {
  username: UserNameAliasNameT;
  email: UserNameAliasNameT;
  phone_number: UserNameAliasNameT;
}
