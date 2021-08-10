import { Injectable } from '@angular/core';
import { CustomComponents, PropContext } from '../common';

@Injectable({
  providedIn: 'root',
})
export class AuthPropService {
  constructor() {}
  private _customComponents: CustomComponents = {};
  private _props: PropContext = {};

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
}
