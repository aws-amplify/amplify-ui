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
  onSignInSubmit: (e: any) => void;
  AUTHENTICATOR: string;
  onForgotPasswordClicked: (e: any) => void;
  onCreateAccountClicked: (e: any) => void;
  onInput: (e: any) => void;
  state: Ref<any>;
  username: Ref<string>;
  password: Ref<string>;
  submit: (e: any) => void;
}

export interface SignUpSetupReturnTypes {
  onHaveAccountClicked: () => void;
  onSignUpSubmit: (e: any) => void;
  onChange: (e: Event) => void;
  state: Ref<any>;
  phone: Ref<string>;
  submit: (e: any) => void;
  error: Ref<string>;
  secondaryAliases: string[];
  signInButtonText: ComputedRef<string>;
  haveAccountLabel: ComputedRef<string>;
  createAccountLabel: ComputedRef<string>;
  signUpButtonText: ComputedRef<string>;
  userNameAliasNames: ComputedRef<UserNameAliasNamesTypes>;
}

export interface ConfirmPasswordSetupReturnTypes {
  onConfirmSignUpSubmit: (e: any) => void;
  onBackToSignInClicked: () => void;
  submit: (e: any) => void;
  confirmSignUpHeading: ComputedRef<string>;
  confirmationCodeText: ComputedRef<string>;
  lostYourCodeText: ComputedRef<string>;
  resendCodeText: ComputedRef<string>;
  backSignInText: ComputedRef<string>;
  confirmText: ComputedRef<string>;
  onLostCodeClicked: () => void;
  state: Ref<any>;
  send: PayloadSender<EventObject>;
  primaryAlias: string;
}

export interface SignUpPhoneControlTypes {
  phoneNumberLabel: ComputedRef<string>;
  options: Array<{ value: string }>;
  phonePreFix: Ref<string>;
  phoneNumber: Ref<string>;
}

export interface AuthenticatorSetupReturnTypes {
  currentPage: Ref<string>;
  state: Ref<any>;
  send: PayloadSender<EventObject>;
  onSignInSubmitI: (e: any) => void;
  onSignUpSubmitI: (e: any) => void;
  onConfirmSignUpSubmitI: (e: any) => void;
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
