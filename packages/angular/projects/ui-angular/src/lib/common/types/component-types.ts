import { EventEmitter, TemplateRef } from '@angular/core';
import { AuthFormData } from '@aws-amplify/ui';

/**
 * Maps custom components from customer to the name of the component it's overriding.
 */
export type CustomComponents = Record<string, TemplateRef<unknown>>;

/**
 * Contains properties to be passed to each auth subcomponents.
 */
export interface PropContext {
  signIn?: {
    onSignInInput: EventEmitter<AuthFormData>;
    onSignInSubmit: EventEmitter<AuthFormData>;
  };
  signUp?: {
    onSignUpInput: EventEmitter<AuthFormData>;
    onSignUpSubmit: EventEmitter<AuthFormData>;
  };
  confirmSignUp?: {
    onConfirmSignUpInput: EventEmitter<AuthFormData>;
    onConfirmSignUpSubmit: EventEmitter<AuthFormData>;
  };
}
