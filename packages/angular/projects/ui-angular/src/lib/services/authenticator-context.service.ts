import { Injectable } from '@angular/core';
import { CustomComponents, FormError, PropContext } from '../common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorContextService {
  constructor() {}
  private _customComponents: CustomComponents = {};
  private _props: PropContext = {};
  private _formError: FormError = {};

  public get customComponents(): CustomComponents {
    return this._customComponents;
  }

  public set customComponents(customComponents: CustomComponents) {
    this._customComponents = { ...this._customComponents, ...customComponents };
  }

  public get props(): PropContext {
    return this._props;
  }

  public set props(props: PropContext) {
    this._props = { ...this._props, ...props };
  }

  public get formError(): FormError {
    return this._formError;
  }

  public set formError(formError: FormError) {
    this._formError = formError;
  }
}
