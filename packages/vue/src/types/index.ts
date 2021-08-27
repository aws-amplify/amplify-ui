import { Ref, ComputedRef, Slot } from 'vue';
import { PayloadSender } from 'xstate';
import {
  AuthActorState,
  AuthEvent,
  AuthInputAttributes,
  FederatedIdentityProviders,
  ResetPasswordState,
  SignInState,
  SignUpState,
} from '@aws-amplify/ui-core';

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
  uName: Ref<string>;
}
export interface FederatedSignInButtonReturnTypes {
  onClick: (e: Event) => void;
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
  actorState: ComputedRef<SignInState>;
}

export interface SignUpSetupReturnTypes {
  onHaveAccountClicked: () => void;
  onSignUpSubmit: (e: Event) => void;
  onInput: (e: Event) => void;
  state: Ref;
  actorState: ComputedRef<SignUpState>;
  phone: Ref<string>;
  submit: () => void;
  secondaryAliases: string[];
  signInButtonText: ComputedRef<string>;
  haveAccountLabel: ComputedRef<string>;
  createAccountLabel: ComputedRef<string>;
  signUpButtonText: ComputedRef<string>;
  inputAttributes: ComputedRef<AuthInputAttributes>;
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
  actorState: ComputedRef<AuthActorState>;
  send: PayloadSender<AuthEvent>;
  username: string;
}

export interface ConfirmSignInSetupReturnTypes {
  confirmSignInHeading: string;
  onConfirmSignInSubmit: (e: Event) => void;
  onBackToSignInClicked: () => void;
  submit: (e: Event) => void;
  backSignInText: ComputedRef<string>;
  confirmText: ComputedRef<string>;
  actorState: ComputedRef<SignInState>;
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
  actorState: ComputedRef<AuthActorState>;
  send: PayloadSender<AuthEvent>;
  onSignInSubmitI: (e: Event) => void;
  onSignUpSubmitI: (e: Event) => void;
  onConfirmSignUpSubmitI: (e: Event) => void;
  onConfirmSignInSubmitI: (e: Event) => void;
  onConfirmSetupTOTPSubmitI: (e: Event) => void;
  onForceNewPasswordSubmitI: (e: Event) => void;
  onResetPasswordSubmitI: (e: Event) => void;
  onConfirmResetPasswordSubmitI: (e: Event) => void;
}

export interface AliasControlTypes {
  inputAttributes: ComputedRef<AuthInputAttributes>;
}

export interface FederatedSignInReturnTypes {
  loginMechanisms: string[];
  fp: ComputedRef<typeof FederatedIdentityProviders>;
  includeFacebook: boolean;
  includeGoogle: boolean;
  includeAmazon: boolean;
  shouldShowFederatedSignIn: boolean;
}

export interface ForceNewPasswordReturnTypes {
  changePasswordLabel: ComputedRef<string>;
  changingPasswordLabel: ComputedRef<string>;
  submit: (e: Event) => void;
  onForceNewPasswordSubmit: (e: Event) => void;
  actorState: ComputedRef<SignInState>;
  onHaveAccountClicked: () => void;
  signInButtonText: ComputedRef<string>;
  haveAccountLabel: ComputedRef<string>;
}

export type InternalSlots = {
  [name: string]: Slot | undefined;
};

export interface PrimitiveSlotReturnType {
  mySlots: Readonly<InternalSlots>;
}

export interface ResetPasswordSetupReturnTypes {
  onResetPasswordSubmit: (e: Event) => void;
  onBackToSignInClicked: () => void;
  submit: (e: Event) => void;
  onChange: (e: Event) => void;
  resetPasswordText: ComputedRef<string>;
  resetPasswordHeading: ComputedRef<string>;
  backSignInText: ComputedRef<string>;
  actorState: ComputedRef<ResetPasswordState>;
}

export interface ConfirmResetPasswordSetupReturnTypes {
  onConfirmResetPasswordSubmit: (e: Event) => void;
  onBackToSignInClicked: () => void;
  submit: (e: Event) => void;
  onLostYourCodeClicked: () => void;
  onChange: (e: Event) => void;
  actorState: ComputedRef<ResetPasswordState>;
  backSignInText: ComputedRef<string>;
  lostYourCodeText: ComputedRef<string>;
  resendCodeText: ComputedRef<string>;
  confirmationCodeText: ComputedRef<string>;
  confirmResetPasswordText: ComputedRef<string>;
  confirmResetPasswordHeading: ComputedRef<string>;
}
