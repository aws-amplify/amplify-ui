import { TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

export type CustomComponents = Record<string, TemplateRef<any>>;

export interface PropContext {
  signIn?: Record<string, any>; // type this
  signUp?: Record<string, any>;
}

export type SignInValidators = Record<string, ValidatorFn[]>;
