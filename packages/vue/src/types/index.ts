import {
  AuthContext,
  AuthEvent,
  DefaultFormFieldOptions,
  SignInState,
  SignUpState,
} from '@aws-amplify/ui';
import { ComputedRef, InjectionKey, Ref, Slot } from 'vue';
import { Interpreter } from 'xstate';

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
  defaultFormFieldOptions: DefaultFormFieldOptions;
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
