import { Ref, ComputedRef, VNode } from "vue";
import { PayloadSender, EventObject } from "xstate";
export interface SignInEventTypeProps {
  headless: boolean;
  usernameAlias: string;
}

export interface SetupEventContext {
  emit: (eventName: string, payload?: unknown) => void;
  attrs: Record<string, unknown>;
}

export interface SignInSetupReturnTypes {
  onSignInSubmit: (e: any) => void;
  AUTHENTICATOR: string;
  onForgotPasswordClicked: (e: any) => void;
  onCreateAccountClicked: (e: any) => void;
  state: Ref<any>;
  username: Ref<string>;
  password: Ref<string>;
  submit: (e: any) => void;
  signInUserNameText: ComputedRef<string>;
}

export interface SignUpSetupReturnTypes {
  onHaveAccountClicked: () => void;
  onSignUpSubmit: (e: any) => void;
  onChange: (e: Event) => void;
  state: Ref<any>;
  phone: Ref<string>;
  submit: (e: any) => void;
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
}

export interface SignInAndUpNameControlTypes {
  userName: string;
  disabled: boolean;
  usernameAlias: string;
}

export interface SignUpNameSetupReturnTypes {
  name: ComputedRef<string> | Ref<string>;
  signInUserNameText: ComputedRef<string>;
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
