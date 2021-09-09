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
} from '@aws-amplify/ui';

import { useActor } from '@xstate/vue';
import { inject, InjectionKey } from 'vue';
import { authMachine } from '@aws-amplify/ui';
import { AuthContext, getActorState } from '@aws-amplify/ui';
import { useInterpret } from '@xstate/vue';
import { Interpreter } from 'xstate';

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
  dialCodes: Ref<string[]>;
  defaultDialCode: string;
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
  onVerifyUserSubmitI: (e: Event) => void;
  onConfirmVerifyUserSubmitI: (e: Event) => void;
}

export type InternalSlots = {
  [name: string]: Slot | undefined;
};

export interface PrimitiveSlotReturnType {
  mySlots: Readonly<InternalSlots>;
}

export interface VerifyUserSetupReturnTypes {
  onVerifyUserSubmit: (e: Event) => void;
  onSkipClicked: () => void;
  submit: (e: Event) => void;
  actorState: ComputedRef<SignInState>;
  unverifiedAttributes: Record<string, string>;
  verifyHeading: ComputedRef<string>;
  skipText: ComputedRef<string>;
  verifyText: ComputedRef<string>;
  authInputAttributes: AuthInputAttributes;
}

export type InterpretService = Interpreter<
  AuthContext,
  any,
  AuthEvent,
  {
    value: any;
    context: AuthContext;
  }
>;

export const InterpretServiceInjectionKeyTypes: InjectionKey<InterpretService> =
  Symbol('interpret.service');
