import { Injectable } from '@angular/core';
import { CustomComponents } from '../common';

@Injectable({
  providedIn: 'root',
})
export class ComponentsProviderService {
  constructor() {}
  private _customComponents: CustomComponents;

  public get customComponents(): CustomComponents {
    return this._customComponents;
  }

  public set customComponents(customComponents: CustomComponents) {
    this._customComponents = { ...this._customComponents, ...customComponents };
  }
}
