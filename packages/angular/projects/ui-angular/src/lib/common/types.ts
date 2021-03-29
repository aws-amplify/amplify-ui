import { TemplateRef } from '@angular/core';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthAttribute } from './auth-types';

/**
 * Maps custom components from customer to the name of the component it's overriding.
 */
export type CustomComponents = Record<string, TemplateRef<any>>;

/**
 * Contains properties to be passed to each auth subcomponents.
 */
export interface PropContext {
  signIn?: Record<string, any>; // type this
  signUp?: Record<string, any>;
}

// custom validators to be passed to the sign-in form
export type SignInValidators = Record<string, ValidatorFn[]>;

// maps validation errors to each form input
export type InputErrors = Partial<Record<AuthAttribute, ValidationErrors>>;

export type InputType = 'text' | 'number' | 'email' | 'password';
